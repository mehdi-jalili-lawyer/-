// تابع امن و بدون تداخل برای مدیریت دکمه ورود
function handleLoginSubmit(e) {
    if (e) e.preventDefault();

    const inputVal = document.getElementById('login-input-value')?.value.trim() || '';
    if (!inputVal) {
        if (typeof showToast === 'function') {
            showToast('لطفاً اطلاعات خواسته شده را وارد کنید.', 'error');
        } else {
            alert('لطفاً اطلاعات خواسته شده را وارد کنید.');
        }
        return;
    }

    // بررسی اینکه چه فرمی روی صفحه فعال است (مدیر، معلم یا دانش‌آموز)
    const roleInput = document.getElementById('login-role-type');
    const currentRole = roleInput ? roleInput.value : 'admin';

    // ۱. بررسی ورود مدیر
    if (currentRole === 'admin' || currentUserRole === 'admin') {
        if (inputVal === 'zxcv1234zxcv') {
            if (typeof switchView === 'function') switchView('admin');
            if (typeof showToast === 'function') showToast('با موفقیت وارد پنل مدیریت شدید.');
        } else {
            if (typeof showToast === 'function') showToast('رمز عبور مدیریت اشتباه است.', 'error');
            else alert('رمز عبور مدیریت اشتباه است.');
        }
    } 
    // ۲. بررسی ورود معلم
    else if (currentRole === 'teacher' || currentUserRole === 'teacher') {
        const teachersArray = Object.values(typeof cloudTeachers !== 'undefined' ? cloudTeachers : {});
        const foundTeacher = teachersArray.find(t => 
            (t.nationalId && t.nationalId.toString().trim() === inputVal) || 
            (t.pCode && t.pCode.toString().trim() === inputVal)
        );

        if (foundTeacher) {
            if (typeof currentLoggedInUser !== 'undefined') currentLoggedInUser = foundTeacher;
            if (typeof showToast === 'function') showToast(`خوش آمدید استاد، ${foundTeacher.fullName}`);
        } else {
            if (typeof showToast === 'function') showToast('کد ملی یا کد پرسنلی معلم یافت نشد.', 'error');
            else alert('کد ملی یا کد پرسنلی معلم یافت نشد.');
        }
    } 
    // ۳. بررسی ورود دانش‌آموز
    else {
        const studentsArray = Object.values(typeof cloudStudents !== 'undefined' ? cloudStudents : {});
        const foundStudent = studentsArray.find(s => 
            (s.nationalId && s.nationalId.toString().trim() === inputVal) || 
            (s.code && s.code.toString().trim() === inputVal)
        );

        if (foundStudent) {
            if (typeof currentLoggedInUser !== 'undefined') currentLoggedInUser = foundStudent;
            if (typeof showToast === 'function') showToast(`خوش آمدید، ${foundStudent.fullName}`);
            if (typeof showStudentPanel === 'function') {
                showStudentPanel(foundStudent);
            }
        } else {
            if (typeof showToast === 'function') showToast('کد ملی یا کد دانش‌آموزی در سامانه یافت نشد.', 'error');
            else alert('کد ملی یا کد دانش‌آموزی در سامانه یافت نشد.');
        }
    }
}