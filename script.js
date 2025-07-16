function setTodayDate() {
  const today = new Date();
  const formatted = today.toISOString().split('T')[0];
  document.getElementById('todayDate').value = formatted;
}

function calculateAge() {
  const today = new Date();
  const dobInput = document.getElementById('dob').value;
  if (!dobInput) return alert("Please enter your date of birth!");
  const dob = new Date(dobInput);

  if (isNaN(dob.getTime())) {
    alert("Invalid date! Please enter in YYYY-MM-DD format.");
    return;
  }

  if (today < dob) {
    alert("Oops! You haven't been born yet 😅");
    return;
  }

  let years = today.getFullYear() - dob.getFullYear();
  let months = today.getMonth() - dob.getMonth();
  let days = today.getDate() - dob.getDate();

  if (days < 0) {
    months--;
    days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  document.getElementById('years').textContent = years;
  document.getElementById('months').textContent = months;
  document.getElementById('days').textContent = days;

  const totalDays = Math.floor((today - dob) / (1000 * 60 * 60 * 24));
  const totalWeeks = Math.floor(totalDays / 7);
  const totalMonths = years * 12 + months;
  const totalHours = totalDays * 24;
  const totalMinutes = totalHours * 60;
  const totalSeconds = totalMinutes * 60;

  document.getElementById('totalYears').textContent = years;
  document.getElementById('totalMonths').textContent = totalMonths;
  document.getElementById('totalWeeks').textContent = totalWeeks;
  document.getElementById('totalDays').textContent = totalDays;
  document.getElementById('totalHours').textContent = totalHours;
  document.getElementById('totalMinutes').textContent = totalMinutes;
  document.getElementById('totalSeconds').textContent = totalSeconds;

  const nextBirthday = new Date(today.getFullYear(), dob.getMonth(), dob.getDate());
  if (nextBirthday < today) nextBirthday.setFullYear(today.getFullYear() + 1);

  let nextBDMonths = nextBirthday.getMonth() - today.getMonth();
  let nextBDDays = nextBirthday.getDate() - today.getDate();

  if (nextBDDays < 0) {
    nextBDMonths--;
    const prevMonthDays = new Date(nextBirthday.getFullYear(), nextBirthday.getMonth(), 0).getDate();
    nextBDDays += prevMonthDays;
  }
  if (nextBDMonths < 0) nextBDMonths += 12;

  document.getElementById('nextMonths').textContent = nextBDMonths;
  document.getElementById('nextDays').textContent = nextBDDays;

  const upcomingList = document.getElementById('upcomingList');
  upcomingList.innerHTML = '';
  for (let i = 1; i <= 10; i++) {
    const year = today.getFullYear() + i;
    const bday = new Date(year, dob.getMonth(), dob.getDate());
    const dayName = bday.toLocaleDateString('en-US', { weekday: 'long' });
    const formatted = `${dob.getDate().toString().padStart(2, '0')} ${bday.toLocaleString('default', { month: 'long' })} ${year} – ${dayName}`;
    const li = document.createElement('li');
    li.textContent = formatted;
    upcomingList.appendChild(li);
  }
}

function clearFields() {
  document.getElementById('dob').value = '';
  ['years','months','days','nextMonths','nextDays','totalYears','totalMonths','totalWeeks','totalDays','totalHours','totalMinutes','totalSeconds'].forEach(id => {
    document.getElementById(id).textContent = '--';
  });
  document.getElementById('upcomingList').innerHTML = '';
}
