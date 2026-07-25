/**
 * Contact Form Component
 * Handles contact form functionality with validation and submission
 * @author THE
 */

import { DOM, Animation, Validation, Logger } from '../utils.js';
import { CONFIG } from '../config.js';

export class ContactForm {
  constructor() {
    this.form = null;
    this.fields = {};
    this.submitBtn = null;
    this.loadingDiv = null;
    this.errorDiv = null;
    this.successDiv = null;
    this.isSubmitting = false;
    
    this.init();
  }

  init() {
    this.cacheElements();
    this.bindEvents();
    this.initFormAnimations();
    Logger.log('Contact form component initialized');
  }

  cacheElements() {
    this.form = DOM.select('.game-contact-form') || DOM.select('.php-email-form');
    
    if (!this.form) {
      Logger.warn('Contact form not found');
      return;
    }

    this.fields = {
      name: this.form.querySelector('input[name="name"]'),
      email: this.form.querySelector('input[name="email"]'),
      subject: this.form.querySelector('input[name="subject"]'),
      message: this.form.querySelector('textarea[name="message"]')
    };

    this.submitBtn = this.form.querySelector('.btn-transmit') || this.form.querySelector('button[type="submit"]');
    this.loadingDiv = this.form.querySelector('.loading');
    this.errorDiv = this.form.querySelector('.error-message');
    this.successDiv = this.form.querySelector('.sent-message');
  }

  bindEvents() {
    if (!this.form) return;

    // Form submission
    DOM.on('submit', this.form, this.handleSubmit.bind(this));

    // Real-time validation
    Object.entries(this.fields).forEach(([fieldName, field]) => {
      if (field) {
        DOM.on('blur', field, () => this.validateField(fieldName));
        DOM.on('input', field, () => this.clearFieldError(fieldName));
      }
    });

    // Form field animations
    Object.values(this.fields).forEach(field => {
      if (field) {
        DOM.on('focus', field, this.handleFieldFocus.bind(this));
        DOM.on('blur', field, this.handleFieldBlur.bind(this));
      }
    });
  }

  async handleSubmit(e) {
    e.preventDefault();
    
    if (this.isSubmitting) return;
    
    // Validate all fields
    const isValid = this.validateForm();
    if (!isValid) {
      this.showError('Please fix the errors above and try again.');
      return;
    }

    this.isSubmitting = true;
    this.showLoading();

    try {
      const formData = this.getFormData();
      const result = await this.submitForm(formData);
      
      if (result.success) {
        this.showSuccess();
        this.resetForm();
      } else {
        this.showError(result.message || CONFIG.messages.error);
      }
    } catch (error) {
      Logger.error('Form submission error:', error);
      this.showError(CONFIG.messages.error);
    } finally {
      this.isSubmitting = false;
      this.hideLoading();
    }
  }

  validateForm() {
    let isValid = true;
    
    Object.entries(this.fields).forEach(([fieldName, field]) => {
      if (field && !this.validateField(fieldName)) {
        isValid = false;
      }
    });
    
    return isValid;
  }

  validateField(fieldName) {
    const field = this.fields[fieldName];
    if (!field) return true;
    
    const value = field.value.trim();
    const rules = CONFIG.validation[fieldName];
    let error = null;

    // Required validation
    if (rules?.required && !Validation.isRequired(value)) {
      error = `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
    }
    // Length validation
    else if (rules?.minLength && value.length < rules.minLength) {
      error = `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} must be at least ${rules.minLength} characters`;
    }
    else if (rules?.maxLength && value.length > rules.maxLength) {
      error = `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} must be less than ${rules.maxLength} characters`;
    }
    // Email validation
    else if (fieldName === 'email' && value && !Validation.isEmail(value)) {
      error = 'Please enter a valid email address';
    }

    if (error) {
      this.showFieldError(field, error);
      return false;
    } else {
      this.clearFieldError(fieldName);
      return true;
    }
  }

  showFieldError(field, message) {
    field.classList.add('error');
    
    // Remove existing error message
    const existing = field.parentNode.querySelector('.field-error');
    if (existing) existing.remove();
    
    // Add new error message
    const errorElement = DOM.create('div', {
      className: 'field-error',
      style: {
        color: '#ff6b6b',
        fontSize: '0.875rem',
        marginTop: '0.25rem',
        display: 'block'
      }
    }, message);
    
    field.parentNode.appendChild(errorElement);
  }

  clearFieldError(fieldName) {
    const field = this.fields[fieldName];
    if (!field) return;
    
    field.classList.remove('error');
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
      errorElement.remove();
    }
  }

  getFormData() {
    const data = {};
    Object.entries(this.fields).forEach(([fieldName, field]) => {
      if (field) {
        data[fieldName] = field.value.trim();
      }
    });
    return data;
  }

  async submitForm(formData) {
    // Simulate API call - replace with actual implementation
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate random success/failure for demo
        const success = Math.random() > 0.2;
        resolve({
          success,
          message: success ? CONFIG.messages.success : CONFIG.messages.error
        });
      }, 2000);
    });

    // Actual implementation would look like:
    /*
    try {
      const response = await fetch(CONFIG.api.contact, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      const result = await response.json();
      return result;
    } catch (error) {
      Logger.error('Network error:', error);
      throw error;
    }
    */
  }

  showLoading() {
    this.hideAllMessages();
    
    if (this.loadingDiv) {
      this.loadingDiv.style.display = 'block';
      this.loadingDiv.textContent = CONFIG.messages.loading;
    }
    
    if (this.submitBtn) {
      this.submitBtn.disabled = true;
      this.submitBtn.textContent = 'Sending...';
      this.submitBtn.classList.add('loading');
    }
  }

  hideLoading() {
    if (this.loadingDiv) {
      this.loadingDiv.style.display = 'none';
    }
    
    if (this.submitBtn) {
      this.submitBtn.disabled = false;
      this.submitBtn.textContent = 'Send Message';
      this.submitBtn.classList.remove('loading');
    }
  }

  showSuccess() {
    this.hideAllMessages();
    
    if (this.successDiv) {
      this.successDiv.style.display = 'block';
      this.successDiv.textContent = CONFIG.messages.success;
      
      // Auto-hide after 5 seconds
      setTimeout(() => {
        this.hideAllMessages();
      }, 5000);
    }
  }

  showError(message) {
    this.hideAllMessages();
    
    if (this.errorDiv) {
      this.errorDiv.style.display = 'block';
      this.errorDiv.textContent = message;
    } else {
      // Create temporary error display
      const tempError = DOM.create('div', {
        className: 'temp-error-message',
        style: {
          color: '#ff6b6b',
          padding: '1rem',
          border: '1px solid #ff6b6b',
          borderRadius: '8px',
          margin: '1rem 0',
          backgroundColor: 'rgba(255, 107, 107, 0.1)'
        }
      }, message);
      
      this.form.insertBefore(tempError, this.submitBtn);
      
      setTimeout(() => {
        if (tempError.parentNode) {
          tempError.parentNode.removeChild(tempError);
        }
      }, 5000);
    }
  }

  hideAllMessages() {
    if (this.loadingDiv) this.loadingDiv.style.display = 'none';
    if (this.errorDiv) this.errorDiv.style.display = 'none';
    if (this.successDiv) this.successDiv.style.display = 'none';
    
    // Remove temporary error messages
    const tempErrors = this.form.querySelectorAll('.temp-error-message');
    tempErrors.forEach(error => error.remove());
  }

  resetForm() {
    if (!this.form) return;
    
    this.form.reset();
    
    // Clear all field errors
    Object.keys(this.fields).forEach(fieldName => {
      this.clearFieldError(fieldName);
    });
    
    // Reset field states
    Object.values(this.fields).forEach(field => {
      if (field) {
        field.classList.remove('error', 'focused', 'filled');
      }
    });
  }

  initFormAnimations() {
    if (!this.form) return;

    // Add floating label effect
    Object.values(this.fields).forEach(field => {
      if (field) {
        const label = field.parentNode.querySelector('label');
        if (label) {
          this.updateLabelState(field, label);
        }
      }
    });
  }

  handleFieldFocus(e) {
    const field = e.target;
    const label = field.parentNode.querySelector('label');
    
    field.classList.add('focused');
    
    if (label) {
      label.classList.add('focused');
    }
  }

  handleFieldBlur(e) {
    const field = e.target;
    const label = field.parentNode.querySelector('label');
    
    field.classList.remove('focused');
    
    if (label) {
      label.classList.remove('focused');
      this.updateLabelState(field, label);
    }
  }

  updateLabelState(field, label) {
    if (field.value.trim()) {
      field.classList.add('filled');
      label.classList.add('filled');
    } else {
      field.classList.remove('filled');
      label.classList.remove('filled');
    }
  }

  // Public methods
  validateAndSubmit() {
    this.form.dispatchEvent(new Event('submit'));
  }

  clearForm() {
    this.resetForm();
    this.hideAllMessages();
  }

  populateForm(data) {
    Object.entries(data).forEach(([fieldName, value]) => {
      const field = this.fields[fieldName];
      if (field) {
        field.value = value;
        const label = field.parentNode.querySelector('label');
        if (label) {
          this.updateLabelState(field, label);
        }
      }
    });
  }

  destroy() {
    // Clean up any timers or observers
    Logger.log('Contact form component destroyed');
  }
}

export default ContactForm;
