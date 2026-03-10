// ========================================
// OpenScholar — Donor: Donation Flow
// ========================================

import { ngos, programs, students } from '../../data/mock.js';
import { icon } from '../../icons.js';

export function renderDonate() {
  const verifiedNgos = ngos.filter(n => n.status === 'verified');

  return `
    <div class="page-header animate-fade-in">
      <h1>Make a Donation</h1>
      <p>Support education by donating to an NGO, program, or individual student</p>
    </div>

    <div class="donation-form animate-fade-in-up" style="max-width: 680px;">
      <div class="card" style="margin-bottom: var(--space-6);">
        <h2 style="font-size: var(--font-xl); font-weight: 700; margin-bottom: var(--space-6);">${icon('heart', 20)} Donation Details</h2>

        <div class="form-group">
          <label class="form-label">Donation Type</label>
          <select class="form-select" id="donation-type">
            <option value="ngo">General NGO Fund</option>
            <option value="program">Specific Program</option>
            <option value="student">Individual Student</option>
          </select>
        </div>

        <div class="form-group">
          <label class="form-label">Select NGO</label>
          <select class="form-select" id="select-ngo">
            <option value="">Choose an NGO...</option>
            ${verifiedNgos.map(n => `<option value="${n.id}">${n.name} — ${n.location}</option>`).join('')}
          </select>
        </div>

        <div class="form-group" id="program-group">
          <label class="form-label">Select Program</label>
          <select class="form-select" id="select-program">
            <option value="">Choose a program...</option>
            ${programs.filter(p => p.status === 'active').map(p => {
    const ngo = ngos.find(n => n.id === p.ngoId);
    return `<option value="${p.id}">${p.name} (${ngo?.name})</option>`;
  }).join('')}
          </select>
        </div>

        <div class="form-group">
          <label class="form-label">Donation Amount (USD)</label>
          <div class="amount-grid">
            <button class="amount-btn" data-amount="25">$25</button>
            <button class="amount-btn" data-amount="50">$50</button>
            <button class="amount-btn selected" data-amount="100">$100</button>
            <button class="amount-btn" data-amount="250">$250</button>
            <button class="amount-btn" data-amount="500">$500</button>
            <button class="amount-btn" data-amount="1000">$1,000</button>
          </div>
          <input class="form-input" type="number" placeholder="Or enter custom amount..." id="custom-amount" style="margin-top: var(--space-2);" />
        </div>

        <div class="form-group">
          <label class="form-label">Your Name</label>
          <input class="form-input" type="text" placeholder="Enter your full name" value="Sarah Mitchell" />
        </div>

        <div class="form-group">
          <label class="form-label">Email</label>
          <input class="form-input" type="email" placeholder="your@email.com" value="sarah@example.com" />
        </div>

        <div class="form-group">
          <label class="form-label">Message (Optional)</label>
          <textarea class="form-textarea" placeholder="Leave a message for the recipient..." rows="3">Supporting education in Nepal</textarea>
        </div>
      </div>

      <!-- Payment Section -->
      <div class="card" style="margin-bottom: var(--space-6);">
        <h2 style="font-size: var(--font-xl); font-weight: 700; margin-bottom: var(--space-6);">${icon('credit-card', 20)} Payment Information</h2>

        <div class="form-group">
          <label class="form-label">Card Number</label>
          <input class="form-input" type="text" placeholder="4242 4242 4242 4242" style="font-family: monospace;" />
        </div>

        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Expiry</label>
            <input class="form-input" type="text" placeholder="MM/YY" />
          </div>
          <div class="form-group">
            <label class="form-label">CVC</label>
            <input class="form-input" type="text" placeholder="123" />
          </div>
        </div>
      </div>

      <!-- Summary -->
      <div class="card" style="background: var(--emerald-50); border-color: var(--emerald-100); margin-bottom: var(--space-6);">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div>
            <div style="font-size: var(--font-sm); color: var(--text-secondary);">Donation Amount</div>
            <div style="font-size: var(--font-3xl); font-weight: 800; color: var(--emerald-600);">$100.00</div>
          </div>
          <div style="text-align: right;">
            <div style="font-size: var(--font-sm); color: var(--text-secondary); display: flex; align-items: center; gap: var(--space-2);">${icon('check-circle', 14)} 100% goes to education</div>
            <div style="font-size: var(--font-xs); color: var(--text-tertiary);">Zero platform fees</div>
          </div>
        </div>
      </div>

      <button class="btn btn-primary btn-lg" style="width: 100%;" id="donate-btn">
        ${icon('send', 18)} Complete Donation — $100.00
      </button>
    </div>
  `;
}

export function bindDonateEvents() {
  document.querySelectorAll('.amount-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.amount-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      const amt = btn.dataset.amount;
      const donateBtn = document.getElementById('donate-btn');
      if (donateBtn) donateBtn.innerHTML = `<i data-lucide="send" class="lucide" style="width:18px;height:18px;"></i> Complete Donation — $${Number(amt).toLocaleString()}.00`;
    });
  });

  const donateBtn = document.getElementById('donate-btn');
  if (donateBtn) {
    donateBtn.addEventListener('click', () => {
      const toast = document.createElement('div');
      toast.className = 'toast success';
      toast.innerHTML = '<i data-lucide="check-circle" class="lucide" style="width:18px;height:18px;"></i> Donation successful! Thank you for supporting education.';
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 4000);
    });
  }
}
