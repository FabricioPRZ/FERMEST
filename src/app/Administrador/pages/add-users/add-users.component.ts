import { Component } from '@angular/core';
import { FormUserComponent } from '../../components/form-user/form-user.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-users',
  imports: [FormUserComponent, CommonModule, FormsModule],
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.scss'],
})
export class AddUsersComponent {
  showModal = false;
  isEditing = false;
  currentUserIndex: number | null = null;
  selectedUserData: any = null;

  searchTerm = '';
  currentPage = 1;
  itemsPerPage = 5;

  usuarios = [
    { name: 'Fabricio', lastname: 'Pérez', email: 'fabricio@email.com', role: 'admin' },
    { name: 'Yaretzi', lastname: 'Velazquez', email: 'yare@email.com', role: 'estudiante' },
    { name: 'Luis', lastname: 'Hernández', email: 'luis@email.com', role: 'estudiante' },
    { name: 'María', lastname: 'Rodríguez', email: 'maria@email.com', role: 'docente' },
    { name: 'Carlos', lastname: 'Díaz', email: 'carlos@email.com', role: 'admin' },
    { name: 'Laura', lastname: 'Martínez', email: 'laura@email.com', role: 'estudiante' },
    { name: 'Pedro', lastname: 'López', email: 'pedro@email.com', role: 'docente' },
  ];

  openModal(index: number | null = null): void {
    this.isEditing = index !== null;
    this.currentUserIndex = index;
    this.selectedUserData = index !== null ? { ...this.usuarios[index] } : null;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedUserData = null;
    this.currentUserIndex = null;
  }

  onUserSubmitted(user: any): void {
    if (this.isEditing && this.currentUserIndex !== null) {
      this.usuarios[this.currentUserIndex] = user;
    } else {
      this.usuarios.push(user);
    }
    this.closeModal();
  }

  deleteUser(index: number): void {
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
      this.usuarios.splice(index, 1);
    }
  }

  get filteredUsers() {
    return this.usuarios.filter(user =>
      Object.values(user).some(value =>
        value.toLowerCase().includes(this.searchTerm.toLowerCase())
      )
    );
  }

  get paginatedUsers() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredUsers.slice(start, start + this.itemsPerPage);
  }

  totalPages(): number {
    return Math.ceil(this.filteredUsers.length / this.itemsPerPage);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage = page;
    }
  }
}
