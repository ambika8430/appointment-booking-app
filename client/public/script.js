const appointmentForm = document.getElementById('appointmentForm');
const appointmentTableBody = document.getElementById('appointmentTableBody');

const fetchUsers = async () => {
    try {
        const response = await fetch('http://localhost:3000/');
        const data = await response.json();
        return data.users || [];
    } catch (error) {
        console.error('Error fetching users:', error);
        return [];
    }
};

const deleteUser = async (userId) => {
    try {
        await fetch(`http://localhost:3000/delete/${userId}`, { method: 'DELETE' });
        renderAppointments();
    } catch (error) {
        console.error('Error deleting user:', error);
    }
};

const editUser = async (userId) => {
    try {
        const response = await fetch(`http://localhost:3000/edit/${userId}`);
        const data = await response.json();
        
        document.getElementById('username').value = data.user.username;
        document.getElementById('phone').value = data.user.phone;
        document.getElementById('email').value = data.user.email;
        
        deleteUser(userId);
    } catch (error) {
        console.error('Error editing user:', error);
    }
};

const renderAppointments = async () => {
    const appointments = await fetchUsers();
    appointmentTableBody.innerHTML = '';
    appointments.forEach((appointment) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${appointment.username}</td>
            <td>${appointment.phone}</td>
            <td>${appointment.email}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editUser('${appointment.id}')">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteUser('${appointment.id}')">Delete</button>
            </td>
        `;
        appointmentTableBody.appendChild(row);
    });
};

appointmentForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;

    try {
        const response = await fetch('http://localhost:3000/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, phone, email })
        });

        console.log('Response:', response);
        
        renderAppointments();
        appointmentForm.reset();
    } catch (error) {
        console.error('Error adding user:', error);
    }
});


renderAppointments();
