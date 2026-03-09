import { platformStats } from '../data/mock.js';
import { icon } from '../icons.js';

export function renderLanding() {
  return `
    <div class="landing">
      <!-- Hero -->
      <section class="hero">
        <div class="hero-content animate-fade-in-up">
          <h1>
            Every Donation<br/>
            <span class="highlight">Creates a Future</span>
          </h1>
          <p>
            EduTrack connects generous donors with verified NGOs and scholarship programs,
            ensuring full transparency in how education funds reach the children who need them most.
          </p>
          <div class="hero-actions">
            <a href="#/donor/browse" class="hero-btn hero-btn-primary">
              Start Donating ${icon('arrow-right', 18)}
            </a>
            <a href="#/public-dashboard" class="hero-btn hero-btn-secondary">
              View Transparency Dashboard
            </a>
          </div>

          <div class="hero-stats">
            <div class="hero-stat animate-fade-in stagger-2">
              <div class="hero-stat-value">$${(platformStats.totalDonations / 1000).toFixed(0)}K+</div>
              <div class="hero-stat-label">Total Donations</div>
            </div>
            <div class="hero-stat animate-fade-in stagger-3">
              <div class="hero-stat-value">${platformStats.totalStudents}+</div>
              <div class="hero-stat-label">Students Helped</div>
            </div>
            <div class="hero-stat animate-fade-in stagger-4">
              <div class="hero-stat-value">${platformStats.totalNGOs}</div>
              <div class="hero-stat-label">Verified NGOs</div>
            </div>
            <div class="hero-stat animate-fade-in stagger-5">
              <div class="hero-stat-value">${platformStats.totalSchools}</div>
              <div class="hero-stat-label">Partner Schools</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Trust Indicators -->
      <section class="trust-section">
        <div class="section-wrapper">
          <div class="section-header animate-fade-in-up">
            <h2>Built on Trust & Transparency</h2>
            <p>Every rupee is tracked, verified, and documented so you can see exactly where your donation goes.</p>
          </div>
          <div class="trust-grid">
            <div class="trust-card animate-fade-in-up stagger-1">
              <div class="trust-card-icon" style="background: var(--emerald-100); color: var(--emerald-600);">
                ${icon('shield-check', 28)}
              </div>
              <h3>Verified NGOs</h3>
              <p>Every NGO is verified with tax clearance and registration documents before they can receive any funding.</p>
            </div>
            <div class="trust-card animate-fade-in-up stagger-2">
              <div class="trust-card-icon" style="background: var(--blue-100); color: var(--blue-600);">
                ${icon('activity', 28)}
              </div>
              <h3>Real-time Tracking</h3>
              <p>Track your donation from the moment it's made to the moment it reaches a student — with proof documents.</p>
            </div>
            <div class="trust-card animate-fade-in-up stagger-3">
              <div class="trust-card-icon" style="background: var(--amber-100); color: var(--amber-600);">
                ${icon('file-check', 28)}
              </div>
              <h3>Documented Proof</h3>
              <p>NGOs submit receipts, invoices, and supporting documents for every expense — viewable by all stakeholders.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- How It Works -->
      <section class="how-section">
        <div class="section-wrapper">
          <div class="section-header animate-fade-in-up">
            <h2>How EduTrack Works</h2>
            <p>A simple 4-step process from donation to impact.</p>
          </div>
          <div class="how-steps">
            <div class="how-step animate-fade-in-up stagger-1">
              <div class="how-step-number">1</div>
              <h3>Donate</h3>
              <p>Choose a verified NGO, scholarship program, or individual student to support.</p>
            </div>
            <div class="how-step animate-fade-in-up stagger-2">
              <div class="how-step-number">2</div>
              <h3>Allocate</h3>
              <p>NGOs distribute funds to scholarship categories: tuition, books, uniforms, and more.</p>
            </div>
            <div class="how-step animate-fade-in-up stagger-3">
              <div class="how-step-number">3</div>
              <h3>Verify</h3>
              <p>Schools submit invoices. NGOs review and approve with supporting documents.</p>
            </div>
            <div class="how-step animate-fade-in-up stagger-4">
              <div class="how-step-number">4</div>
              <h3>Track</h3>
              <p>View transparent records of how every dollar was spent and the impact created.</p>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA -->
      <section class="cta-section">
        <div class="animate-fade-in-up">
          <h2>Ready to Make a Difference?</h2>
          <p>Join thousands of donors who trust EduTrack to deliver their generosity to children who need it most.</p>
          <div class="hero-actions">
            <a href="#/donor/browse" class="hero-btn hero-btn-primary">
              Browse Programs ${icon('arrow-right', 18)}
            </a>
            <a href="#/public-dashboard" class="hero-btn hero-btn-secondary">
              See Our Impact
            </a>
          </div>
        </div>
      </section>

      <!-- Footer -->
      <footer class="footer">
        <p>© 2026 EduTrack. Transparent education funding for a brighter future. 
        <a href="#/public-dashboard">Public Dashboard</a></p>
      </footer>
    </div>
  `;
}
