import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { Transaction } from '@/hooks/useTransactions';

interface ExportData {
  transactions: Transaction[];
  type: 'income' | 'expense';
  title: string;
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('nl-NL', {
    style: 'currency',
    currency: 'EUR',
  }).format(value);
};

const formatDate = () => {
  return new Intl.DateTimeFormat('nl-NL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date());
};

export const exportToPDF = ({ transactions, type, title }: ExportData) => {
  const doc = new jsPDF();
  
  // Title
  doc.setFontSize(20);
  if (type === 'income') {
    doc.setTextColor(34, 197, 94);
  } else {
    doc.setTextColor(239, 68, 68);
  }
  doc.text(title, 14, 22);
  
  // Date
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text(`Gegenereerd op: ${formatDate()}`, 14, 30);
  
  // Calculate total
  const total = transactions.reduce((sum, t) => sum + Number(t.amount), 0);
  doc.setFontSize(12);
  doc.setTextColor(0);
  doc.text(`Totaal: ${formatCurrency(total)}`, 14, 38);
  
  // Table
  const tableData = transactions.map((t) => [
    t.name,
    t.categories?.name || 'Geen categorie',
    t.day_of_month ? `${t.day_of_month}e` : '-',
    t.household_members?.name || '-',
    t.is_shared ? 'Ja' : 'Nee',
    formatCurrency(Number(t.amount)),
  ]);
  
  const headColor: [number, number, number] = type === 'income' ? [34, 197, 94] : [239, 68, 68];
  
  autoTable(doc, {
    head: [['Naam', 'Categorie', 'Dag', 'Gezinslid', 'Gezamenlijk', 'Bedrag']],
    body: tableData,
    startY: 45,
    headStyles: {
      fillColor: headColor,
      textColor: 255,
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245],
    },
  });
  
  doc.save(`${title.toLowerCase().replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.pdf`);
};

interface ExcelRow {
  Naam: string;
  Categorie: string;
  'Dag van de maand': string | number;
  Gezinslid: string;
  Gezamenlijk: string;
  Bedrag: number;
  Beschrijving: string;
}

export const exportToExcel = ({ transactions, type, title }: ExportData) => {
  const data: ExcelRow[] = transactions.map((t) => ({
    Naam: t.name,
    Categorie: t.categories?.name || 'Geen categorie',
    'Dag van de maand': t.day_of_month || '-',
    Gezinslid: t.household_members?.name || '-',
    Gezamenlijk: t.is_shared ? 'Ja' : 'Nee',
    Bedrag: Number(t.amount),
    Beschrijving: t.description || '',
  }));
  
  // Add total row
  const total = transactions.reduce((sum, t) => sum + Number(t.amount), 0);
  data.push({
    Naam: 'TOTAAL',
    Categorie: '',
    'Dag van de maand': '',
    Gezinslid: '',
    Gezamenlijk: '',
    Bedrag: total,
    Beschrijving: '',
  });
  
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, title);
  
  // Auto-size columns
  const maxWidth = 20;
  const keys = Object.keys(data[0] || {}) as (keyof ExcelRow)[];
  const colWidths = keys.map((key) => ({
    wch: Math.min(maxWidth, Math.max(String(key).length, ...data.map((row) => String(row[key]).length))),
  }));
  worksheet['!cols'] = colWidths;
  
  XLSX.writeFile(workbook, `${title.toLowerCase().replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.xlsx`);
};
