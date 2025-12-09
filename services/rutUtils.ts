
export const cleanRut = (rut: string): string => {
  return typeof rut === 'string' ? rut.replace(/[^0-9kK]+/g, '').toUpperCase() : '';
};

export const validateRut = (rut: string): boolean => {
  if (!rut) return false;
  
  const clean = cleanRut(rut);
  if (clean.length < 2) return false;

  const body = clean.slice(0, -1);
  const dv = clean.slice(-1);

  if (body.length < 7) return false; // Minimum RUT length

  let sum = 0;
  let multiplier = 2;

  for (let i = body.length - 1; i >= 0; i--) {
    sum += parseInt(body.charAt(i)) * multiplier;
    multiplier = multiplier < 7 ? multiplier + 1 : 2;
  }

  const mod = 11 - (sum % 11);
  const expectedDv = mod === 11 ? '0' : mod === 10 ? 'K' : mod.toString();

  return dv === expectedDv;
};

export const formatRut = (rut: string): string => {
  const clean = cleanRut(rut);
  if (clean.length <= 1) return clean;

  const body = clean.slice(0, -1);
  const dv = clean.slice(-1);

  // Standard format with dots and dash: 12.345.678-K
  // Or simple format with dash only as per implicit request: 12345678-K
  // The user prompt said: "El usuario simplemente debe ingresar los caracteres alfanuméricos y el guión se escribirá automáticamente."
  // We will provide formatted with dots for better readability, or just dash if preferred.
  // Standard Chilean display usually includes dots. Let's use dots + dash.
  
  let formattedBody = "";
  for(let i = body.length - 1, j = 1; i >= 0; i--, j++) {
      formattedBody = body.charAt(i) + formattedBody;
      if (j % 3 === 0 && i !== 0) {
          formattedBody = "." + formattedBody;
      }
  }

  return `${formattedBody}-${dv}`;
};
