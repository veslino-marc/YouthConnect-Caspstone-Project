import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SkSidebar } from '../../../shared/components/sk-sidebar/sk-sidebar';
import { ConcernService } from '../../../services/concern.service';
import { Concern } from '../../../models/concern.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-concerns',
  standalone: true,
  imports: [SkSidebar, CommonModule, FormsModule],
  templateUrl: './concerns.html',
  styleUrl: './concerns.scss',
})
export class Concerns implements OnInit {
  concerns: Concern[] = [];
  filteredConcerns: Concern[] = [];
  paginatedConcerns: Concern[] = [];
  loading = true; // Show loading immediately
  errorMessage = '';
  deletingId: number | null = null;

  // Search and sort state
  searchTerm = '';
  sortColumn: keyof Concern | null = null;
  sortDirection: 'asc' | 'desc' = 'asc';
  filterType: string = '';
  filterStatus: string = '';

  // Pagination state
  itemsPerPage = 10;
  currentPage = 1;
  totalPages = 1;
  Math = Math; // Expose Math to template

  constructor(private concernService: ConcernService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.fetchConcerns();
  }

  fetchConcerns() {
    this.loading = true;
    this.concernService.getAllConcerns().subscribe({
      next: (data) => {
        this.concerns = data;
        this.applyFilters();
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        this.errorMessage = 'Failed to load concerns.';
        this.loading = false;
        this.cdr.markForCheck();
      }
    });
  }

  onDelete(concern: Concern) {
    if (!confirm('Are you sure you want to delete this concern?')) return;
    this.deletingId = concern.concernId || null;
    this.concernService.deleteConcern(concern.concernId!).subscribe({
      next: () => {
        this.concerns = this.concerns.filter(c => c.concernId !== concern.concernId);
        this.applyFilters();
        this.deletingId = null;
        this.cdr.markForCheck();
      },
      error: () => {
        alert('Failed to delete concern.');
        this.deletingId = null;
        this.cdr.markForCheck();
      }
    });
  }

  onSearchChange() {
    this.applyFilters();
    this.cdr.markForCheck();
  }

  onSort(column: keyof Concern) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.applyFilters();
    this.cdr.markForCheck();
  }

  onTypeFilterChange(type: string) {
    this.filterType = type;
    this.applyFilters();
    this.cdr.markForCheck();
  }

  onStatusFilterChange(status: string) {
    this.filterStatus = status;
    this.applyFilters();
    this.cdr.markForCheck();
  }

  applyFilters() {
    let filtered = [...this.concerns];
    // Search
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.trim().toLowerCase();
      filtered = filtered.filter(c =>
        (c.title && c.title.toLowerCase().includes(term)) ||
        (c.typeOfConcern && c.typeOfConcern.toLowerCase().includes(term)) ||
        (c.description && c.description.toLowerCase().includes(term)) ||
        (c.status && c.status.toLowerCase().includes(term))
      );
    }
    // Type filter
    if (this.filterType) {
      filtered = filtered.filter(c => c.typeOfConcern === this.filterType);
    }
    // Status filter
    if (this.filterStatus) {
      filtered = filtered.filter(c => c.status === this.filterStatus);
    }
    // Sort
    if (this.sortColumn) {
      const col = this.sortColumn;
      filtered = filtered.sort((a, b) => {
        const aVal = a[col];
        const bVal = b[col];
        if (aVal == null) return 1;
        if (bVal == null) return -1;
        if (aVal < bVal) return this.sortDirection === 'asc' ? -1 : 1;
        if (aVal > bVal) return this.sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }
    this.filteredConcerns = filtered;
    this.currentPage = 1; // Reset to first page
    this.updatePagination();
  }

  updatePagination() {
    this.totalPages = Math.ceil(this.filteredConcerns.length / this.itemsPerPage);
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedConcerns = this.filteredConcerns.slice(startIndex, endIndex);
  }

  onPageChange(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
      this.cdr.markForCheck();
    }
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const maxVisible = 5;
    let startPage = Math.max(1, this.currentPage - Math.floor(maxVisible / 2));
    const endPage = Math.min(this.totalPages, startPage + maxVisible - 1);
    startPage = Math.max(1, endPage - maxVisible + 1);
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  }

  getTypeOptions(): string[] {
    return Array.from(new Set(this.concerns.map(c => c.typeOfConcern).filter((v): v is string => typeof v === 'string')));
  }

  getStatusOptions(): string[] {
    return Array.from(new Set(this.concerns.map(c => c.status).filter((v): v is string => typeof v === 'string')));
  }

  // Export filtered concerns to CSV
  exportToCSV() {
    const headers = ['Title', 'Type', 'Description', 'Status', 'Created At'];
    const rows = this.filteredConcerns.map(c => [
      c.title,
      c.typeOfConcern,
      c.description,
      c.status,
      c.createdAt ? new Date(c.createdAt).toLocaleString() : ''
    ]);
    let csvContent = '';
    csvContent += headers.join(',') + '\n';
    rows.forEach(row => {
      csvContent += row.map(field => '"' + (field ? String(field).replace(/"/g, '""') : '') + '"').join(',') + '\n';
    });
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'concerns.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  }

  // Export filtered concerns to PDF
  async exportToPDF() {
    // Dynamically import jsPDF and autoTable
    const jsPDFModule = await import('jspdf');
    const autoTableModule = await import('jspdf-autotable');
    const doc = new jsPDFModule.jsPDF();
    const headers = [['Title', 'Type', 'Description', 'Status', 'Created At']];
    const rows = this.filteredConcerns.map(c => [
      c.title,
      c.typeOfConcern,
      c.description,
      c.status,
      c.createdAt ? new Date(c.createdAt).toLocaleString() : ''
    ]);
    (autoTableModule as any).default(doc, {
      head: headers,
      body: rows,
      styles: { fontSize: 9 },
      headStyles: { fillColor: [25, 118, 210] },
      margin: { top: 20 },
      didDrawPage: (data: any) => {
        doc.text('Youth Concerns', data.settings.margin.left, 10);
      }
    });
    doc.save('concerns.pdf');
  }
}
