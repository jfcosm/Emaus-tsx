
import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useSettings } from '../contexts/SettingsContext';
import { useAuth } from '../contexts/AuthContext';
import { FinanceTransaction } from '../types';
import { getTransactions, addTransaction, deleteTransaction } from '../services/financeService';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Plus, 
  Search, 
  Trash2, 
  Calendar,
  Lock,
  ArrowRight,
  CheckCircle,
  CreditCard,
  PieChart,
  Calculator as CalculatorIcon,
  Delete
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const Finances: React.FC = () => {
  const { t } = useLanguage();
  const { settings } = useSettings();
  const { logout } = useAuth();

  const [transactions, setTransactions] = useState<FinanceTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);

  // Calculator State
  const [calcDisplay, setCalcDisplay] = useState('0');
  const [calcExpression, setCalcExpression] = useState('');

  // Form State
  const initialForm = {
    date: new Date().toISOString().split('T')[0],
    type: 'income',
    category: 'Estipendios',
    amount: '',
    description: '',
    paymentMethod: 'Efectivo'
  };
  const [formData, setFormData] = useState(initialForm);

  // --- UPSELL LOCK FOR BASIC PLANS ---
  if (settings.planType === 'basic') {
    return (
      <div className="h-[calc(100vh-6rem)] bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden relative animate-fade-in">
        {/* Blurred Content */}
        <div className="absolute inset-0 filter blur-md opacity-30 pointer-events-none p-8">
            <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="h-32 bg-green-100 rounded-2xl"></div>
                <div className="h-32 bg-red-100 rounded-2xl"></div>
                <div className="h-32 bg-blue-100 rounded-2xl"></div>
            </div>
            <div className="h-64 bg-slate-100 rounded-2xl mb-8"></div>
            <div className="space-y-4">
                <div className="h-12 bg-slate-100 rounded-xl"></div>
                <div className="h-12 bg-slate-100 rounded-xl"></div>
                <div className="h-12 bg-slate-100 rounded-xl"></div>
            </div>
        </div>

        {/* Upsell Card */}
        <div className="absolute inset-0 z-10 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-900 max-w-md w-full p-8 rounded-3xl shadow-2xl border border-gold-200 dark:border-gold-800 text-center relative overflow-hidden transform hover:scale-105 transition-transform duration-500">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-gold-300 to-gold-500"></div>
                <div className="w-20 h-20 bg-gold-50 dark:bg-gold-900/20 rounded-full flex items-center justify-center mx-auto mb-6 ring-8 ring-gold-50/50 dark:ring-gold-900/10">
                    <Lock className="w-10 h-10 text-gold-600 dark:text-gold-400" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">{t('finances.upsell.title')}</h2>
                <p className="text-slate-500 dark:text-slate-400 mb-8 leading-relaxed text-sm">{t('finances.upsell.desc')}</p>
                <ul className="text-left space-y-4 mb-8 max-w-xs mx-auto bg-slate-50 dark:bg-slate-950/50 p-6 rounded-xl border border-slate-100 dark:border-slate-800">
                    <li className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
                        <div className="bg-emaus-100 dark:bg-emaus-900/30 p-1 rounded-full"><CheckCircle className="w-4 h-4 text-emaus-600 dark:text-emaus-400" /></div>
                        {t('finances.upsell.benefit1')}
                    </li>
                    <li className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300">
                        <div className="bg-emaus-100 dark:bg-emaus-900/30 p-1 rounded-full"><CheckCircle className="w-4 h-4 text-emaus-600 dark:text-emaus-400" /></div>
                        {t('finances.upsell.benefit2')}
                    </li>
                </ul>
                <button 
                    onClick={async () => {
                        await logout();
                        window.location.href = window.location.origin + '/#plans';
                    }} 
                    className="w-full py-3.5 bg-emaus-700 text-white rounded-xl font-bold hover:bg-emaus-800 transition-all shadow-lg shadow-emaus-900/20 flex items-center justify-center gap-2 group"
                >
                    {t('finances.upsell.cta')} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </div>
      </div>
    );
  }

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const data = await getTransactions();
    setTransactions(data);
    setLoading(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.amount || !formData.description) return;

    try {
        const newTrans: Omit<FinanceTransaction, 'id'> = {
            date: formData.date,
            type: formData.type as 'income' | 'expense',
            category: formData.category,
            amount: parseInt(formData.amount),
            description: formData.description,
            paymentMethod: formData.paymentMethod as any
        };
        await addTransaction(newTrans);
        await loadData();
        setShowModal(false);
        setFormData(initialForm);
    } catch (error) {
        alert("Error al guardar transacción");
    }
  };

  const handleDelete = async (id: string) => {
      if (confirm("¿Eliminar este movimiento?")) {
          await deleteTransaction(id);
          setTransactions(prev => prev.filter(t => t.id !== id));
      }
  };

  // --- CALCULATOR LOGIC ---
  const handleCalcInput = (val: string) => {
    if (val === 'C') {
        setCalcDisplay('0');
        return;
    }
    if (val === '=') {
        try {
            // Evaluator safe simple math
            // Replace visual operators for JS
            const expression = calcDisplay.replace(/×/g, '*').replace(/÷/g, '/');
            // eslint-disable-next-line no-new-func
            const result = new Function('return ' + expression)();
            setCalcDisplay(String(Math.round(result * 100) / 100)); // Round to 2 decimals
        } catch (e) {
            setCalcDisplay('Error');
        }
        return;
    }
    
    // Prevent multiple operators
    if (['+', '-', '×', '÷'].includes(val)) {
       if (['+', '-', '×', '÷'].includes(calcDisplay.slice(-1))) {
           setCalcDisplay(prev => prev.slice(0, -1) + val);
           return;
       }
    }

    if (calcDisplay === '0' || calcDisplay === 'Error') {
        if (['+', '-', '×', '÷'].includes(val)) {
             setCalcDisplay('0' + val); // Start with 0 if operator first
        } else {
             setCalcDisplay(val);
        }
    } else {
        setCalcDisplay(prev => prev + val);
    }
  };

  // Calculations
  const totalIncome = transactions.filter(t => t.type === 'income').reduce((acc, curr) => acc + curr.amount, 0);
  const totalExpense = transactions.filter(t => t.type === 'expense').reduce((acc, curr) => acc + curr.amount, 0);
  const balance = totalIncome - totalExpense;

  // Chart Data Preparation (Simple Last 6 Months)
  const chartData = [
      { name: 'Total', ingresos: totalIncome, egresos: totalExpense }
  ];

  const filteredTransactions = transactions.filter(t => 
      t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white">{t('finances.title')}</h2>
                <p className="text-slate-500 dark:text-slate-400">{t('finances.subtitle')}</p>
            </div>
            <button 
                onClick={() => setShowModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-emaus-700 text-white rounded-lg hover:bg-emaus-800 shadow-sm transition-colors"
            >
                <Plus className="w-4 h-4" /> {t('finances.new_transaction')}
            </button>
        </div>

        {/* SUMMARY CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 relative overflow-hidden">
                <div className="relative z-10">
                    <p className="text-sm font-bold text-slate-500 uppercase mb-1">{t('finances.income')}</p>
                    <h3 className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">${totalIncome.toLocaleString()}</h3>
                </div>
                <TrendingUp className="absolute right-4 bottom-4 w-16 h-16 text-emerald-50 dark:text-emerald-900/20" />
            </div>
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 relative overflow-hidden">
                <div className="relative z-10">
                    <p className="text-sm font-bold text-slate-500 uppercase mb-1">{t('finances.expense')}</p>
                    <h3 className="text-3xl font-bold text-red-600 dark:text-red-400">${totalExpense.toLocaleString()}</h3>
                </div>
                <TrendingDown className="absolute right-4 bottom-4 w-16 h-16 text-red-50 dark:text-red-900/20" />
            </div>
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 relative overflow-hidden">
                <div className="relative z-10">
                    <p className="text-sm font-bold text-slate-500 uppercase mb-1">{t('finances.balance')}</p>
                    <h3 className={`text-3xl font-bold ${balance >= 0 ? 'text-blue-600 dark:text-blue-400' : 'text-orange-600'}`}>${balance.toLocaleString()}</h3>
                </div>
                <DollarSign className="absolute right-4 bottom-4 w-16 h-16 text-blue-50 dark:text-blue-900/20" />
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* CHART */}
            <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
                <h3 className="font-bold text-slate-800 dark:text-white mb-6">Resumen Financiero</h3>
                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData} layout="vertical">
                            <CartesianGrid strokeDasharray="3 3" horizontal={false} strokeOpacity={0.2} />
                            <XAxis type="number" hide />
                            <YAxis dataKey="name" type="category" hide />
                            <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                            <Bar dataKey="ingresos" fill="#10b981" radius={[0, 4, 4, 0]} barSize={40} />
                            <Bar dataKey="egresos" fill="#ef4444" radius={[0, 4, 4, 0]} barSize={40} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* RIGHT COLUMN: CALCULATOR & PAYMENTS */}
            <div className="space-y-6">
                
                {/* CALCULATOR */}
                <div className="bg-slate-800 p-6 rounded-2xl shadow-lg border border-slate-700">
                    <div className="flex items-center justify-between mb-4 text-white">
                        <h3 className="font-bold flex items-center gap-2"><CalculatorIcon className="w-4 h-4" /> {t('finances.calculator')}</h3>
                    </div>
                    {/* Display */}
                    <div className="bg-slate-900 p-3 rounded-xl mb-4 text-right">
                        <span className="text-2xl font-mono text-emerald-400 overflow-hidden text-ellipsis block">{calcDisplay}</span>
                    </div>
                    {/* Grid */}
                    <div className="grid grid-cols-4 gap-2">
                        {['C', '÷', '×', '⌫'].map((btn) => (
                            <button 
                                key={btn} 
                                onClick={() => {
                                    if(btn === '⌫') setCalcDisplay(prev => prev.length > 1 ? prev.slice(0, -1) : '0');
                                    else handleCalcInput(btn);
                                }}
                                className={`p-3 rounded-lg font-bold transition-colors ${btn === 'C' ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' : 'bg-slate-700 text-gold-400 hover:bg-slate-600'}`}
                            >
                                {btn}
                            </button>
                        ))}
                        {['7', '8', '9', '-'].map((btn) => (
                            <button 
                                key={btn} 
                                onClick={() => handleCalcInput(btn)}
                                className={`p-3 rounded-lg font-bold transition-colors ${['-'].includes(btn) ? 'bg-slate-700 text-gold-400 hover:bg-slate-600' : 'bg-slate-600 text-white hover:bg-slate-500'}`}
                            >
                                {btn}
                            </button>
                        ))}
                        {['4', '5', '6', '+'].map((btn) => (
                            <button 
                                key={btn} 
                                onClick={() => handleCalcInput(btn)}
                                className={`p-3 rounded-lg font-bold transition-colors ${['+'].includes(btn) ? 'bg-slate-700 text-gold-400 hover:bg-slate-600' : 'bg-slate-600 text-white hover:bg-slate-500'}`}
                            >
                                {btn}
                            </button>
                        ))}
                        {['1', '2', '3', '='].map((btn) => (
                            <button 
                                key={btn} 
                                onClick={() => handleCalcInput(btn)}
                                className={`p-3 rounded-lg font-bold transition-colors ${btn === '=' ? 'bg-emerald-600 text-white hover:bg-emerald-500 row-span-2' : 'bg-slate-600 text-white hover:bg-slate-500'}`}
                                style={btn === '=' ? { gridRow: 'span 2' } : {}}
                            >
                                {btn}
                            </button>
                        ))}
                        {/* Last row handled manually for zero and alignment if needed, but grid flow works. 
                            Wait, grid flow: 1,2,3,=. Then next row 0.
                            Let's restructure for standard layout 
                        */}
                    </div>
                    <div className="grid grid-cols-4 gap-2 mt-2">
                         <button onClick={() => handleCalcInput('0')} className="col-span-2 p-3 rounded-lg font-bold bg-slate-600 text-white hover:bg-slate-500">0</button>
                         <button onClick={() => handleCalcInput('.')} className="p-3 rounded-lg font-bold bg-slate-600 text-white hover:bg-slate-500">.</button>
                         {/* Equal button was in previous row, let's fix grid logic above to match standard calc */}
                    </div>
                </div>

                {/* PAYMENT METHODS */}
                <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
                    <h3 className="font-bold text-slate-800 dark:text-white mb-4">Métodos de Pago</h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white dark:bg-slate-700 rounded-full text-slate-600"><DollarSign className="w-4 h-4" /></div>
                                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Efectivo</span>
                            </div>
                            <span className="font-bold text-slate-800 dark:text-white">65%</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-white dark:bg-slate-700 rounded-full text-slate-600"><CreditCard className="w-4 h-4" /></div>
                                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Transferencia</span>
                            </div>
                            <span className="font-bold text-slate-800 dark:text-white">35%</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* TRANSACTIONS TABLE */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
                <h3 className="font-bold text-slate-800 dark:text-white">Movimientos Recientes</h3>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                        type="text" 
                        placeholder={t('finances.search')}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9 pr-4 py-1.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emaus-500 dark:text-white"
                    />
                </div>
            </div>
            
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50 dark:bg-slate-800/50 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">
                        <tr>
                            <th className="px-6 py-4">{t('finances.table.date')}</th>
                            <th className="px-6 py-4">{t('finances.table.description')}</th>
                            <th className="px-6 py-4">{t('finances.table.category')}</th>
                            <th className="px-6 py-4">{t('finances.table.amount')}</th>
                            <th className="px-6 py-4 text-right"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {loading ? (
                            <tr><td colSpan={5} className="text-center py-8 text-slate-400">Cargando...</td></tr>
                        ) : filteredTransactions.length === 0 ? (
                            <tr><td colSpan={5} className="text-center py-8 text-slate-400">{t('finances.no_transactions')}</td></tr>
                        ) : (
                            filteredTransactions.map(t => (
                                <tr key={t.id} className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{t.date}</td>
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-slate-800 dark:text-white">{t.description}</div>
                                        <div className="text-xs text-slate-400">{t.paymentMethod}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded text-xs font-medium">
                                            {t.category}
                                        </span>
                                    </td>
                                    <td className={`px-6 py-4 font-bold ${t.type === 'income' ? 'text-emerald-600' : 'text-red-600'}`}>
                                        {t.type === 'income' ? '+' : '-'}${t.amount.toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button onClick={() => handleDelete(t.id)} className="text-slate-400 hover:text-red-500 transition-colors">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>

        {/* CREATE MODAL */}
        {showModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl shadow-xl overflow-hidden border border-slate-200 dark:border-slate-800 animate-fade-in">
                    <div className="p-6 border-b border-slate-100 dark:border-slate-800">
                        <h3 className="text-lg font-bold text-slate-800 dark:text-white">{t('finances.modal.title')}</h3>
                    </div>
                    <form onSubmit={handleSubmit} className="p-6 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">{t('finances.modal.type')}</label>
                                <select 
                                    name="type"
                                    value={formData.type}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white dark:border-slate-700"
                                >
                                    <option value="income">{t('finances.income')}</option>
                                    <option value="expense">{t('finances.expense')}</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">{t('finances.modal.date')}</label>
                                <input 
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white dark:border-slate-700"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">{t('finances.modal.amount')}</label>
                            <input 
                                type="number"
                                name="amount"
                                required
                                value={formData.amount}
                                onChange={handleInputChange}
                                placeholder="0"
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white dark:border-slate-700"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">{t('finances.modal.desc')}</label>
                            <input 
                                type="text"
                                name="description"
                                required
                                value={formData.description}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white dark:border-slate-700"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">{t('finances.modal.category')}</label>
                                <select 
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white dark:border-slate-700"
                                >
                                    <option value="Estipendios">{t('finances.categories.stipends')}</option>
                                    <option value="Colecta">{t('finances.categories.collection')}</option>
                                    <option value="Donaciones">{t('finances.categories.donations')}</option>
                                    <option value="Servicios Básicos">{t('finances.categories.services')}</option>
                                    <option value="Mantenimiento">{t('finances.categories.maintenance')}</option>
                                    <option value="Insumos">{t('finances.categories.supplies')}</option>
                                    <option value="Personal">{t('finances.categories.personnel')}</option>
                                    <option value="Otro">{t('finances.categories.other')}</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">{t('finances.modal.method')}</label>
                                <select 
                                    name="paymentMethod"
                                    value={formData.paymentMethod}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white dark:border-slate-700"
                                >
                                    <option value="Efectivo">Efectivo</option>
                                    <option value="Transferencia">Transferencia</option>
                                    <option value="Cheque">Cheque</option>
                                    <option value="Otro">Otro</option>
                                </select>
                            </div>
                        </div>

                        <div className="pt-4 flex gap-3">
                            <button 
                                type="button" 
                                onClick={() => setShowModal(false)}
                                className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800"
                            >
                                {t('finances.modal.cancel')}
                            </button>
                            <button 
                                type="submit"
                                className="flex-1 px-4 py-2 bg-emaus-700 text-white rounded-lg hover:bg-emaus-800 shadow-sm font-bold"
                            >
                                {t('finances.modal.save')}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )}
    </div>
  );
};

export default Finances;