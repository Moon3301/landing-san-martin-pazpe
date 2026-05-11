import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  form!: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      nombres:     ['', [Validators.required, Validators.minLength(2)]],
      apellidos:   ['', [Validators.required, Validators.minLength(2)]],
      dni:         ['', [Validators.required, Validators.minLength(7)]],
      celular:     ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
      email:       ['', [Validators.required, Validators.email]],
      distrito:    ['', Validators.required],
      proposito:   ['', Validators.required],
      terminos:    [false, Validators.requiredTrue],
      autorizacion:[false]
    });
  }

  get f() { return this.form.controls; }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) return;
    this.router.navigate(['/gracias']);
  }
}
