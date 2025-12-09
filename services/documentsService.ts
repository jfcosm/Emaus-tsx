
import { db } from './firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy, where } from 'firebase/firestore';
import { SavedDocument } from '../types';

const COLLECTION_NAME = 'documents';

// Obtener todos los documentos y carpetas
export const getDocuments = async (): Promise<SavedDocument[]> => {
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy('lastModified', 'desc'));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as SavedDocument));
  } catch (error) {
    console.error("Error getting documents:", error);
    return [];
  }
};

// Crear un nuevo documento o carpeta
export const createDocument = async (docData: Omit<SavedDocument, 'id'>): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), docData);
    return docRef.id;
  } catch (error) {
    console.error("Error creating document:", error);
    throw error;
  }
};

// Actualizar un documento (Renombrar, Mover, Guardar Contenido)
export const updateDocument = async (id: string, updates: Partial<SavedDocument>): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    // Actualizamos siempre la fecha de modificación
    const finalUpdates = {
        ...updates,
        lastModified: new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
    };
    await updateDoc(docRef, finalUpdates);
  } catch (error) {
    console.error("Error updating document:", error);
    throw error;
  }
};

// Eliminar un documento o carpeta
export const deleteDocument = async (id: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, id));
  } catch (error) {
    console.error("Error deleting document:", error);
    throw error;
  }
};

// Eliminar carpeta y su contenido
export const deleteFolderAndContents = async (folderId: string): Promise<void> => {
    try {
        // 1. Borrar la carpeta
        await deleteDocument(folderId);
        
        // 2. Buscar hijos
        const q = query(collection(db, COLLECTION_NAME), where('parentId', '==', folderId));
        const snapshot = await getDocs(q);
        
        // 3. Borrar hijos
        const deletePromises = snapshot.docs.map(doc => deleteDoc(doc.ref));
        await Promise.all(deletePromises);
        
    } catch (error) {
        console.error("Error deleting folder contents:", error);
        throw error;
    }
}

// Utility: Ensure folder structure exists
export const ensureFolderStructure = async (path: string[]): Promise<string | null> => {
    let parentId: string | null = null;

    for (const folderName of path) {
        // Find folder with this name and parentId
        let q;
        if (parentId === null) {
             q = query(collection(db, COLLECTION_NAME), where('name', '==', folderName), where('type', '==', 'folder'), where('parentId', '==', null));
        } else {
             q = query(collection(db, COLLECTION_NAME), where('name', '==', folderName), where('type', '==', 'folder'), where('parentId', '==', parentId));
        }
        
        const snapshot = await getDocs(q);
        
        if (!snapshot.empty) {
            parentId = snapshot.docs[0].id;
        } else {
            // Create folder
            parentId = await createDocument({
                name: folderName,
                type: 'folder',
                parentId: parentId,
                lastModified: new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
                size: '--'
            });
        }
    }
    return parentId;
};
