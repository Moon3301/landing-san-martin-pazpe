import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormDataWeb } from '../../dto/form.dto';
import { HomeService } from '../../../services/home.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {

  form!: FormGroup;
  submitted   = false;
  loading     = false;
  submitError = false;

  /* ── Hero carousel ────────────────────────────────── */
  heroImages = [
    'assets/images/piscina-san-martin.jpg',
    'assets/images/zona-de-parrillas.jpeg',
  ];
  currentImageIndex = 0;
  private carouselTimer: ReturnType<typeof setInterval> | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private homeService: HomeService
  ) {}

  ngOnInit(): void {
    this.startCarousel();
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

  async onSubmit(): Promise<void> {
    this.submitted    = true;
    this.submitError  = false;
    if (this.form.invalid) return;

    const formData: FormDataWeb = {
      document:    this.form.value.dni,
      email:       this.form.value.email,
      fname:       this.form.value.nombres,
      lname:       this.form.value.apellidos,
      phone:       this.form.value.celular,
      proyecto:    'San Martin',
      proyectoID:  '30',
      sourceId:    '35',
      utmCampaing: 'organico',
      utmMedium:   'proforma web',
      utmSource:   'organico',
      observation: 'Proposito de compra: ' + this.form.value.proposito + ' - Distrito: ' + this.form.value.distrito,
      unidad:      '1',
      unidadID:    '1',
      tipologia:   '1',
      tipologiaID: '1',
      sendEmail: false
    };

    this.loading = true;
    try {
      await this.homeService.sendFormData(formData);
      this.router.navigate(['/gracias']);
    } catch {
      this.submitError = true;
    } finally {
      this.loading = false;
    }
  }

  /* ── Carousel helpers ───────────────────────────────── */
  goToSlide(index: number): void {
    this.currentImageIndex = index;
    // Reset the auto-play so it doesn't fire immediately after a manual click
    if (this.carouselTimer) clearInterval(this.carouselTimer);
    this.startCarousel();
  }

  private startCarousel(): void {
    this.carouselTimer = setInterval(() => {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.heroImages.length;
    }, 5000);
  }

  ngOnDestroy(): void {
    if (this.carouselTimer) clearInterval(this.carouselTimer);
  }
}
