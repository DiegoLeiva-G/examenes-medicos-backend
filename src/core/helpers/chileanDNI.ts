export const validateChileanDNI = (rut: string): boolean => {
  const cleanedRut = cleanRut(rut, true);

  if (cleanedRut.length < 8 || cleanedRut.length > 9) {
    return false;
  }

  const dv = cleanedRut.slice(-1).toUpperCase();
  const rutWithoutDv = cleanedRut.slice(0, -1);

  let suma = 0;
  let multiplication = 2;

  for (let i = rutWithoutDv.length - 1; i >= 0; i--) {
    suma += parseInt(rutWithoutDv[i]) * multiplication;
    multiplication = multiplication < 7 ? multiplication + 1 : 2;
  }

  const expectedDv = 11 - (suma % 11);
  const computedDv = expectedDv === 11 ? '0' : expectedDv === 10 ? 'K' : expectedDv.toString();

  return computedDv === dv;
};

export const formatChileanDNI = (rut: string): string => {
  const cleanedRut = cleanRut(rut, true);

  const dv = cleanedRut.slice(-1);
  let rutWithoutDv = cleanedRut.slice(0, -1);

  rutWithoutDv = rutWithoutDv.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  return `${rutWithoutDv}-${dv}`;
};

export const cleanRut = (rut: string, full: boolean = false): string => {
  if (!full) {
    return rut.replace(/\./g, '');
  }

  return rut.replace(/\./g, '').replace(/-/g, '');
};
