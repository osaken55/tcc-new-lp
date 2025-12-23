// スムーススクロール
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// FAQアコーディオン
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', function () {
        const answer = this.nextElementSibling;
        const isActive = this.classList.contains('active');

        // 全てのFAQを閉じる
        document.querySelectorAll('.faq-question').forEach(q => {
            q.classList.remove('active');
            q.nextElementSibling.classList.remove('active');
        });

        // クリックされたFAQが閉じていた場合のみ開く
        if (!isActive) {
            this.classList.add('active');
            answer.classList.add('active');
        }
    });
});

// フォーム送信
document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // 簡単なバリデーション
    const requiredFields = this.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.style.borderColor = '#ff6b6b';
        } else {
            field.style.borderColor = 'rgba(255, 255, 255, 0.3)';
        }
    });

    if (isValid) {
        alert('お問い合わせいただきありがとうございます。\n48時間以内に担当者よりご連絡いたします。');
        this.reset();
    } else {
        alert('必須項目を入力してください。');
    }
});

// スクロール時のアニメーション
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// カードにアニメーションを適用
document.querySelectorAll('.problem-card, .why-card, .feature-card, .testimonial-card, .pricing-card, .process-step').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(card);
});

// プライシングカードのホバー効果
document.querySelectorAll('.pricing-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
        if (!this.classList.contains('featured')) {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 25px 60px rgba(0, 0, 0, 0.1)';
        }
    });

    card.addEventListener('mouseleave', function () {
        if (!this.classList.contains('featured')) {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.06)';
        }
    });
});
