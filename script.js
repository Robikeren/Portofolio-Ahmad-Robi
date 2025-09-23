document.getElementById('year').textContent = new Date().getFullYear();

// Dark mode toggle
const themeBtn = document.getElementById('themeToggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Cek preferensi sistem atau localStorage
if (localStorage.getItem('theme') === 'dark' || 
    (prefersDarkScheme.matches && !localStorage.getItem('theme'))) {
  document.body.classList.add('dark');
  themeBtn.textContent = 'Light';
} else {
  document.body.classList.remove('dark');
  themeBtn.textContent = 'Dark';
}

themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  themeBtn.textContent = isDark ? 'Light' : 'Dark';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// Smooth scroll untuk navigasi
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const headerOffset = document.querySelector('header').offsetHeight;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Modal logic
function openProject(el) {
  const modal = document.getElementById('modal');
  document.getElementById('modalTitle').textContent = el.dataset.title;
  document.getElementById('modalBody').textContent = el.querySelector('p').textContent;
  modal.classList.add('active');
  
  // Tambahkan event listener untuk menutup modal dengan ESC
  document.addEventListener('keydown', handleEscKey);
}

function closeModal() { 
  const modal = document.getElementById('modal');
  modal.classList.remove('active');
  
  // Hapus event listener
  document.removeEventListener('keydown', handleEscKey);
}

function handleEscKey(event) {
  if (event.key === 'Escape') {
    closeModal();
  }
}

// Tutup modal ketika klik di luar konten modal
document.getElementById('modal').addEventListener('click', (e) => {
  if (e.target.id === 'modal') {
    closeModal();
  }
});

// Contact form functions
function sendEmail() {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const msg = document.getElementById('message').value;
  
  if (!name || !email || !msg) {
    showToast('Harap isi semua field sebelum mengirim pesan.', 'error');
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    showToast('Masukkan alamat email yang valid.', 'error');
    return;
  }
  
  const subject = `Pesan dari ${name} (${email})`;
  const body = msg;
  
  window.location.href = `mailto:rrobbyxx@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function copyEmail() {
  navigator.clipboard.writeText("rrobbyxx@gmail.com")
    .then(() => {
      showToast('Email disalin ke clipboard!', 'success');
    })
    .catch(err => {
      console.error('Gagal menyalin email: ', err);
      showToast('Gagal menyalin email. Silakan salin secara manual: rrobbyxx@gmail.com', 'error');
    });
}

// Toast notification function
function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.textContent = message;
  toast.style.position = 'fixed';
  toast.style.bottom = '20px';
  toast.style.right = '20px';
  toast.style.backgroundColor = type === 'success' ? 'var(--primary)' : '#e63946';
  toast.style.color = 'white';
  toast.style.padding = '12px 24px';
  toast.style.borderRadius = '6px';
  toast.style.zIndex = '1000';
  toast.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
  toast.style.fontWeight = '500';
  toast.style.opacity = '0';
  toast.style.transition = 'opacity 0.3s ease-in-out';
  document.body.appendChild(toast);

  // Fade in
  setTimeout(() => {
    toast.style.opacity = '1';
  }, 10);

  // Fade out and remove
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => {
      document.body.removeChild(toast);
    }, 300);
  }, 3000);
}

// Animasi scroll dengan IntersectionObserver
function setupScrollAnimations() {
  const elements = document.querySelectorAll('.fade-up');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('appear');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  elements.forEach(element => {
    observer.observe(element);
  });
}

// Event listeners untuk tombol
document.querySelector('.contact-btn').addEventListener('click', () => {
  const headerOffset = document.querySelector('header').offsetHeight;
  const contactSection = document.getElementById('contact');
  const elementPosition = contactSection.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  });
});

document.querySelector('.projects-btn').addEventListener('click', () => {
  const headerOffset = document.querySelector('header').offsetHeight;
  const projectsSection = document.getElementById('projects');
  const elementPosition = projectsSection.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  });
});

document.querySelector('.send-btn').addEventListener('click', sendEmail);
document.querySelector('.copy-btn').addEventListener('click', copyEmail);
document.querySelector('.close-modal-btn').addEventListener('click', closeModal);

// Event listeners untuk project cards
document.querySelectorAll('.project').forEach(project => {
  project.addEventListener('click', (e) => {
    // Cek jika klik pada link "Detail" di TechLeaf
    if (e.target.classList.contains('btn') && e.target.textContent === 'Detail') {
      return; // Biarkan link bekerja tanpa membuka modal
    }
    openProject(project);
  });
});

// Continuous animation for skills
function animateSkills() {
  const skills = document.querySelectorAll('.skill, .tag');
  skills.forEach((skill, index) => {
    skill.style.animation = 'fadeIn 0.5s ease-in-out';
    skill.style.animationDelay = `${index * 0.1}s`;
    skill.style.animationFillMode = 'both';
  });
}

// Event listeners saat halaman dimuat
document.addEventListener('DOMContentLoaded', () => {
  // Jalankan animasi scroll
  setupScrollAnimations();

  // Tambahkan efek ketikan dinamis untuk teks hero
  const typingElement = document.querySelector('.typing');
  if (typingElement) {
    const text = typingElement.textContent;
    typingElement.textContent = '';
    let i = 0;
    function type() {
      if (i < text.length) {
        typingElement.textContent += text.charAt(i);
        i++;
        setTimeout(type, 100);
      }
    }
    type();
  }

  // Animasikan skills
  animateSkills();

  // Debugging gambar profil
  const profilePhoto = document.querySelector('.profile-photo');
  if (profilePhoto) {
    console.log('Mencoba memuat foto profil dari:', profilePhoto.src);
    profilePhoto.addEventListener('load', () => {
      console.log('Foto profil berhasil dimuat:', profilePhoto.src);
      showToast('Foto profil berhasil dimuat.', 'success');
    });
    profilePhoto.addEventListener('error', (err) => {
      console.error('Gagal memuat foto profil:', profilePhoto.src, err);
      const avatarContainer = document.getElementById('avatar-container');
      avatarContainer.classList.add('error');
      showToast('Gagal memuat foto profil. Menampilkan fallback. Periksa path file Foto.png.', 'error');
    });
  }

  // Debugging gambar podcast
  const podcastImage = document.querySelector('.activity-card:first-child .activity-img');
  if (podcastImage) {
    console.log('Mencoba memuat gambar podcast dari:', podcastImage.src);
    podcastImage.addEventListener('load', () => {
      console.log('Gambar podcast berhasil dimuat:', podcastImage.src);
      showToast('Gambar podcast berhasil dimuat.', 'success');
    });
    podcastImage.addEventListener('error', (err) => {
      console.error('Gagal memuat gambar podcast:', podcastImage.src, err);
      const activityImageContainer = podcastImage.closest('.activity-image');
      activityImageContainer.classList.add('error');
      showToast('Gagal memuat gambar podcast. Menampilkan fallback. Periksa path file Podcast.jpg.', 'error');
    });
  }

  // Handle error pada gambar tag scroller
  const tagIcons = document.querySelectorAll('.tag-icon');
  tagIcons.forEach(icon => {
    console.log('Mencoba memuat ikon tag:', icon.src);
    icon.addEventListener('load', () => {
      console.log('Ikon tag berhasil dimuat:', icon.src);
    });
    icon.addEventListener('error', (err) => {
      console.error('Gagal memuat ikon tag:', icon.src, err);
      icon.style.display = 'none';
      const parent = icon.parentElement;
      parent.textContent = parent.textContent; // Preserve the text
      parent.style.display = 'flex';
      parent.style.alignItems = 'center';
      parent.style.justifyContent = 'center';
      showToast(`Gagal memuat ikon ${icon.alt}. Menampilkan teks saja.`, 'error');
    });
  });

  // Validasi form input
  document.getElementById('name').addEventListener('blur', function() {
    this.style.borderColor = !this.value.trim() ? 'red' : '#ccc';
  });

  document.getElementById('email').addEventListener('blur', function() {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    this.style.borderColor = !emailPattern.test(this.value) ? 'red' : '#ccc';
  });

  document.getElementById('message').addEventListener('blur', function() {
    this.style.borderColor = !this.value.trim() ? 'red' : '#ccc';
  });

  // Tambahkan event listener untuk aktivitas card kedua
  const activityDetailBtn = document.querySelector('.activity-card:nth-child(2) .activity-link');
  if (activityDetailBtn) {
    activityDetailBtn.addEventListener('click', function() {
      showToast('Sebagai anggota dari sebuah riset program PKM - RSH dengan judul Digiocean: inovasi media pembelajaran berbasis eksplorasi fisika oseanografi untuk penguatan literasi sains dan kesiapsiagaan bencana bermuatan kearifan lokal pesisir puger. Berhasil lolos dalam seleksi internal universitas jember dan siap untuk dikembangkan lebih lanjut', 'success');
    });
  }
});

// Continuous background animation
function updateBackgroundAnimation() {
  const circles = document.querySelectorAll('.floating-circle');
  circles.forEach((circle, index) => {
    const delay = parseFloat(circle.style.animationDelay || '0');
    circle.style.animationDelay = `${(delay + 0.1) % 20}s`;
  });
  requestAnimationFrame(updateBackgroundAnimation);
}

// Mulai animasi background
requestAnimationFrame(updateBackgroundAnimation);

// Debounce scroll events for better performance
let isScrolling;
window.addEventListener('scroll', () => {
  clearTimeout(isScrolling);
  isScrolling = setTimeout(() => {
    setupScrollAnimations();
  }, 150);
});