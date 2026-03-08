import { useState } from 'react';
import './App.css';

const courses = [
  {
    title: 'General English',
    level: 'Beginner - Advanced',
    description: 'Speaking, listening, grammar va writing bir dars tizimida olib boriladi.',
  },
  {
    title: 'IELTS Intensive',
    level: 'Band 6.0 - 8.0+',
    description: 'Mock exam, strategy session va individual feedback bilan natijaga ishlaymiz.',
  },
  {
    title: 'Kids & Teens',
    level: '8 - 16 yosh',
    description: 'Interaktiv metodika, vocabulary games va speaking club orqali tez o‘sish.',
  },
  {
    title: 'Speaking Club',
    level: 'Barcha darajalar',
    description: 'Har hafta real topiclar, debate va presentation formatidagi amaliyot.',
  },
];

const centerPrograms = [
  { icon: '📓', label: 'English Kids', mark: '🔸' },
  { icon: '🎯', label: 'IELTS', mark: '🔹' },
  { icon: '📘', label: 'CEFR', mark: '🔸' },
  { icon: '🧠', label: 'Почемучка', mark: '🔹' },
  { icon: '➗', label: 'Математика', mark: '🔸' },
  { icon: '🏛️', label: 'Подготовка к президентской школе', mark: '🔹' },
];

const teachers = [
  {
    name: 'Ms. Nilufar',
    role: 'IELTS Instructor',
    image:
      'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Mr. Jamshid',
    role: 'General English Mentor',
    image:
      'https://images.unsplash.com/photo-1544717302-de2939b7ef71?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Ms. Mohira',
    role: 'Kids Program Lead',
    image:
      'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=900&q=80',
  },
];

const galleryImages = [
  'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80',
  '/image.png',
  '/50.png',
];

function App() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    course: 'English Kids',
    note: '',
  });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setStatus('');

    try {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      };

      let response;
      try {
        response = await fetch('/api/register', requestOptions);
      } catch (_proxyError) {
        response = await fetch('http://localhost:4000/api/register', requestOptions);
      }

      const data = await response.json();

      if (!response.ok || !data.ok) {
        const tgError = data?.details?.description;
        setStatus(`Xatolik: yuborilmadi.${tgError ? ` ${tgError}` : ' Token/chat sozlamasini tekshiring.'}`);
      } else {
        setStatus('Yuborildi. Tez orada siz bilan boglanamiz.');
        setFormData({ name: '', phone: '', course: 'English Kids', note: '' });
      }
    } catch (_error) {
      setStatus("Server bilan ulanishda xatolik. 'npm run dev' bilan ishga tushiring.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="site">
      <header className="hero" id="home">
        <nav className="topbar">
          <div className="brand">Progress School</div>
          <div className="menu">
            <a href="#courses">Kurslar</a>
            <a href="#teachers">Ustozlar</a>
            <a href="#results">Natijalar</a>
            <a href="#register">Royxatdan otish</a>
            <a href="#contact">Aloqa</a>
          </div>
        </nav>

        <div className="hero-content">
          <h1>Ingliz tilini tizimli o‘rganing, real natijaga chiqing</h1>
          <p>
            Progress School education centerida kichik guruhlar, kuchli mentorlar va aniq reja bilan
            IELTS hamda General English yo‘nalishlarida o‘sasiz.
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#contact">
              Bepul sinov darsiga yozilish
            </a>
            <a className="btn btn-light" href="#courses">
              Kurslarni ko‘rish
            </a>
          </div>
          <div className="stats">
            <div>
              <strong>1200+</strong>
              <span>Bitiruvchi</span>
            </div>
            <div>
              <strong>87%</strong>
              <span>IELTS o‘sish ko‘rsatkichi</span>
            </div>
            <div>
              <strong>6 yil</strong>
              <span>Tajriba</span>
            </div>
          </div>
        </div>
      </header>

      <main>
        <section className="section" id="courses">
          <div className="section-head">
            <h2>Kurs yo‘nalishlari</h2>
            <p>Har bir kurs uchun alohida dastur, nazorat va progress tracking ishlaydi.</p>
          </div>
          <article className="programs-board" aria-label="Учебный центр курсы">
            <p className="programs-title">Учебный центр 🏫 Курсы:</p>
            <div className="programs-list">
              {centerPrograms.map((program) => (
                <div className="program-pill" key={program.label}>
                  <span aria-hidden="true">{program.mark}</span>
                  <span aria-hidden="true">{program.icon}</span>
                  <span>{program.label}</span>
                </div>
              ))}
            </div>
          </article>
          <div className="card-grid">
            {courses.map((course) => (
              <article className="card" key={course.title}>
                <p className="course-level">{course.level}</p>
                <h3>{course.title}</h3>
                <p>{course.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section accent" id="teachers">
          <div className="section-head">
            <h2>Ustozlar jamoasi</h2>
            <p>Amaliy tajribaga ega mentorlar har bir o‘quvchi bilan individual ishlaydi.</p>
          </div>
          <div className="teacher-grid">
            {teachers.map((teacher) => (
              <article className="teacher-card" key={teacher.name}>
                <img src={teacher.image} alt={teacher.name} loading="lazy" />
                <div>
                  <h3>{teacher.name}</h3>
                  <p>{teacher.role}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="results">
          <div className="section-head">
            <h2>Markaz hayotidan</h2>
            <p>Dars jarayoni, speaking club va imtihon tayyorgarligidan lavhalar.</p>
          </div>
          <div className="gallery">
            {galleryImages.map((image, index) => (
              <img key={image} src={image} alt={`Progress School gallery ${index + 1}`} loading="lazy" />
            ))}
          </div>
        </section>

        <section className="section register" id="register">
          <div className="section-head">
            <h2>Royxatdan otish</h2>
            <p>Formani toldiring. Sorovingiz Telegram orqali @progress_school_uz ga yuboriladi.</p>
          </div>
          <form className="register-form" onSubmit={handleSubmit}>
            <label>
              Ismingiz
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ism familiya"
                required
              />
            </label>
            <label>
              Telefon
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+998 90 000 00 00"
                required
              />
            </label>
            <label>
              Kurs
              <select name="course" value={formData.course} onChange={handleChange}>
                <option>English Kids</option>
                <option>IELTS</option>
                <option>CEFR</option>
                <option>Почемучка</option>
                <option>Математика</option>
                <option>Подготовка к президентской школе</option>
              </select>
            </label>
            <label>
              Izoh
              <textarea
                name="note"
                value={formData.note}
                onChange={handleChange}
                rows="4"
                placeholder="Qoshimcha malumot"
              />
            </label>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Yuborilmoqda...' : 'Yuborish'}
            </button>
            {status ? <p className="form-status">{status}</p> : null}
          </form>
        </section>
      </main>

      <footer className="footer" id="contact">
        <div>
          <h2>Progress School Education Center</h2>
          <p>Феруза улица — Мирзо-Улугбекский район, Ташкент.</p>
        </div>
        <div className="contact-list">
          <p>
            <strong>Telefon:</strong> +998 99 898 10 00
          </p>
          <p>
            <strong>Telegram:</strong> @progress_school_uz
          </p>
          <p>
            <strong>Часы работы:</strong>
          </p>
          <p>Понедельник: 08:30 - 21:00</p>
          <p>Вторник: 08:00 - 21:00</p>
          <p>Среда: 08:30 - 21:00</p>
          <p>Четверг: 08:30 - 21:00</p>
          <p>Пятница: 08:30 - 21:00</p>
          <p>Суббота: 08:30 - 21:00</p>
          <p>Воскресенье: 08:30 - 13:00</p>
          <p>
            <strong>Местное время:</strong> 08:30 - 13:00
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
