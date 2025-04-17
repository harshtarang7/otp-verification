import { format, parse, isValid } from 'date-fns';

export const formatDOB = (dob: string | null | undefined): string => {
  if (!dob) return "-";

  try {
    let parsedDate: Date | null = null;

    parsedDate = parse(dob, 'yyyy-MM', new Date());
    
    if (!isValid(parsedDate)) {
      parsedDate = new Date(dob);
    }

    if (!isValid(parsedDate)) {
      return dob; 
    }

    const age = new Date().getFullYear() - parsedDate.getFullYear();
    return `${format(parsedDate, 'MMM,yyyy')} (${age}Yrs.)`;

  } catch (error) {
    return dob || "-";
  }
};

export const customDateFormat = (date: string | null | undefined | number | boolean | any[]): string => {
  if (date === null || date === undefined || date === "") return "-";

  if(Array.isArray(date) || typeof date === 'boolean' ){
    return "-";
  }
  try {
    const parsedDate = new Date(date);

    if (!isValid(parsedDate)) {
      return String(date); 
    }


    return format(parsedDate, 'd MMM,yyyy hh:mmaaa');
  } catch (error) {
    return String(date) || "-";
  }
};


export const getStartOfToday = (): string => {
    const now = new Date();
    const formattedDate = format(now, 'yyyy-MM-dd');
    return `${formattedDate} 00:00:00`;
  };