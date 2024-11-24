
    // العناصر الرئيسية
    let btn = document.querySelector('.btn');
    let ref = document.querySelector('.ref');
    let nam = document.querySelector('.nam');
    let fil = document.querySelector('#file');
    let mode = 'create';
    let tmpIndex; // الفهرس المؤقت لتحديث العناصر
    let tm = null; // لتخزين بيانات الصورة

    // تحميل البيانات من LocalStorage
    let data = localStorage.getItem('localprod') 
      ? JSON.parse(localStorage.getItem('localprod')) 
      : [];

    // تحميل الصورة من input file
    fil.addEventListener('change', () => {
      const reader = new FileReader();
      reader.onload = () => {
        tm = reader.result; // حفظ الصورة كبيانات Base64
      };
      if (fil.files[0]) {
        reader.readAsDataURL(fil.files[0]); // قراءة الصورة
      }
    });

    // زر الإضافة أو التحديث
    btn.addEventListener('click', () => {
      const obj = {
        tm: tm,
        ref: ref.value,
        nam: nam.value
      };

      if (!obj.ref || !obj.nam || !obj.tm) {
        alert('Please fill all fields and upload an image!');
        return;
      }

      if (mode === 'create') {
        data.push(obj); // إضافة كائن جديد
      } else {
        data[tmpIndex] = obj; // تحديث الكائن
        mode = 'create';
        btn.textContent = 'Create';
      }

      saveData();
      clearInputs();
      renderData();
    });

    // تنظيف الحقول
    function clearInputs() {
      ref.value = '';
      nam.value = '';
      fil.value = '';
      tm = null;
    }

    // عرض البيانات
    function renderData() {
      const tableBody = document.querySelector('.tb');
      tableBody.innerHTML = ''; // مسح الجدول قبل إعادة عرضه

      data.forEach((item, index) => {
        const row = `
          <tr>
            <td>
              
       <img src="${item.tm}" onclick="openImage('${item.tm}')">
              
            </td>
            <td>${item.ref}</td>
            <td>${item.nam}</td>
            <td>
              <button id="del" onclick="deleteItem(${index})">
              <i class='bx bxs-trash'></i>
              </button>
            </td>
            <td>
              <button id="up" onclick="editItem(${index})">
              <i class='bx bxs-edit'></i>
              </button>
            </td>
          </tr>
        `;
        tableBody.innerHTML += row;
      });
    }

    // حذف عنصر
    function deleteItem(index) {
      data.splice(index, 1);
      saveData();
      renderData();
    }

    // تعديل عنصر
    function editItem(index) {
      const item = data[index];
      ref.value = item.ref;
      nam.value = item.nam;
      tm = item.tm; // تحميل الصورة الحالية
      mode = 'update';
      tmpIndex = index;
      btn.textContent = 'Update';
    }

    // حفظ البيانات في LocalStorage
    function saveData() {
      localStorage.setItem('localprod', JSON.stringify(data));
    }
    function openImage(imageSrc) {
      const newWindow = window.open();
      newWindow.document.write(`
            <html>
              <head>
                <title>View Image</title>
              </head>
              <body style="display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0;">
                <img src="${imageSrc}" alt="Image" style="max-width: 100%; max-height: 100%;">
              </body>
            </html>
          `);
    }

    // عرض البيانات عند تحميل الصفحة
    renderData();
  
