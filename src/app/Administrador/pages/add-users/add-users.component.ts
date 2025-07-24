import { Component, OnInit } from '@angular/core';
import { FormUserComponent } from '../../components/form-user/form-user.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { User } from '../../../interfaces/user';

@Component({
  selector: 'app-add-users',
  imports: [FormUserComponent, CommonModule, FormsModule],
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.scss'],
  standalone: true,
})
export class AddUsersComponent implements OnInit {
  showModal = false;
  isEditing = false;
  currentUserIndex: number | null = null;
  selectedUserData: User | null = null;

  searchTerm = '';
  currentPage = 1;
  itemsPerPage = 5;

  usuarios: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        this.usuarios = Array.isArray(users) ? users : [];
      },
      error: (err) => {
        console.error('Error al cargar usuarios', err);
        this.usuarios = [];
      },
    });
  }

  openModal(index: number | null = null): void {
    this.isEditing = index !== null;
    this.currentUserIndex = index;

    if (index !== null) {
      const userId = this.usuarios[index]?.id;
      if (userId !== undefined && userId !== null) {
        this.userService.getUserById(userId).subscribe({
          next: (userData) => {
            this.selectedUserData = userData;
            this.showModal = true;
          },
          error: (err) => {
            console.error('Error al obtener datos del usuario para editar', err);
            this.selectedUserData = null;
            this.showModal = true;
          }
        });
      } else {
        this.selectedUserData = null;
        this.showModal = true;
      }
    } else {
      this.selectedUserData = null;
      this.showModal = true;
    }
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedUserData = null;
    this.currentUserIndex = null;
  }

  onUserSubmitted(user: User & { password?: string }): void {
  if (this.isEditing && this.currentUserIndex !== null) {
    const id = this.usuarios[this.currentUserIndex]?.id;

    if (id !== undefined) {
      // Construir nuevo objeto excluyendo el email si no cambió
      const updatedUser: any = { ...user };
      if (this.selectedUserData?.email === user.email) {
        // No incluir el email en la petición si no cambió
        delete updatedUser.email;
      }

      if (!user.password) {
        delete updatedUser.password;
      }

      this.userService.updateUser(id, updatedUser).subscribe({
        next: () => this.loadUsers(),
        error: (err) => console.error('Error al actualizar usuario', err),
      });
    }
  } else {
    this.userService.register(user).subscribe({
      next: () => this.loadUsers(),
      error: (err) => console.error('Error al crear usuario', err),
    });
  }

  this.closeModal();
}



  deleteUser(index: number): void {
    const id = this.usuarios[index]?.id;
    if (id !== undefined && id !== null && confirm('¿Estás seguro de eliminar este usuario?')) {
      this.userService.deleteUser(id).subscribe({
        next: () => this.loadUsers(),
        error: (err) => console.error('Error al eliminar usuario', err),
      });
    }
  }

  get filteredUsers(): User[] {
    return this.usuarios.filter((user) =>
      Object.values(user).some((val) =>
        String(val).toLowerCase().includes(this.searchTerm.toLowerCase())
      )
    );
  }

  get paginatedUsers(): User[] {
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
