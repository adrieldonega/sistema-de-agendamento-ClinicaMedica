document.addEventListener('DOMContentLoaded', function () {

    const formAgendamento = document.getElementById('formAgendamento');
    const selectData = document.getElementById('data');
    const selectHorario = document.getElementById('horario');
    const btnAgendar = document.getElementById('btnAgendar');
    const resumoAgendamento = document.getElementById('resumoAgendamento');
    const dadosResumo = document.getElementById('dadosResumo');
    const btnNovoAgendamento = document.getElementById('btnNovoAgendamento');


    const hoje = new Date();
    const dataMinima = hoje.toISOString().split('T')[0];
    selectData.setAttribute('min', dataMinima);

    const horariosDisponiveis = {
        1: ["08:00", "09:00", "10:00", "14:00", "15:00"], //Segunda Feira
        2: ["08:00", "10:00", "11:00", "14:00", "16:00"], //Terça Feira
        3: ["09:00", "10:00", "11:00", "15:00", "16:00"], //Quarta Feira
        4: ["08:00", "09:00", "14:00", "15:00", "16:00"], //Quinta Feira
        5: ["08:00", "10:00", "11:00", "14:00", "15:00"], //Sexta Feira
        6: ["09:00", "10:00", "11:00"], //Sábado
        0: [] // Domingo
    };


    selectData.addEventListener('change', function () {
        const dataConsulta = new Date(this.value);
        const diaSemana = dataConsulta.getDay(); //0 domingo a 6 (sábado)

        selectHorario.innerHTML = '';

        const opcaoPadrao = document.createElement('option');
        opcaoPadrao.value = '';
        opcaoPadrao.textContent = 'Selecione um horário';
        selectHorario.appendChild(opcaoPadrao);

        if (horariosDisponiveis[diaSemana] && horariosDisponiveis[diaSemana].length > 0) {

            horariosDisponiveis[diaSemana].forEach(horario => {
                const opcao = document.createElement('option');
                opcao.value = horario;
                opcao.textContent = horario;
                selectHorario.appendChild(opcao);
            });

            selectHorario.disabled = false;
        } else {
            const opcao = document.createElement('option');
            opcao.value = '';
            opcao.textContent = 'Sem horários disponíveis para esta data';
            selectHorario.appendChild(opcao);
            selectHorario.disabled = true;
        }
    });

    formAgendamento.addEventListener('submit', function (e) {
        e.preventDefault();

        const nome = document.getElementById('nome').value;
        const telefone = document.getElementById('telefone').value;
        const email = document.getElementById('email').value;
        const especialidade = document.getElementById('especialidade').value;
        const data = document.getElementById('data').value;
        const horario = document.getElementById('horario').value;

        if (!nome || !telefone || !email || !especialidade || !data || !horario) {
            alert('Por favor, preencha todos os campos!');
            return;
        }

        const dataObj = new Date(data);
        const dataFormatada = dataObj.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });

        const especialidades = {
            "clinico": "Clínico Geral",
            "cardio": "Cardiologia",
            "dermato": "Dermatologia",
            "ortopedia": "Ortopedia",
            "pediatria": "Pediatria"
        };

        dadosResumo.innerHTML = `
            <p><span class="destaque">Nome: </span>${nome}</p>
            <p><span class="destaque">Telefone: </span>${telefone}</p>
            <p><span class="destaque">E-mail: </span>${email}</p>
            <p><span class="destaque">Especialidade: </span>${especialidades[especialidade]}</p>
            <p><span class="destaque">Data: </span>${dataFormatada}</p>
            <p><span class="destaque">Horário: </span>${horario}</p>
            <p><span class="destaque">Status: </span>Agendamento Confirmado!</p>        
        `;

        formAgendamento.classList.add('hidden');
        resumoAgendamento.classList.remove('hidden');
    });

    btnNovoAgendamento.addEventListener('click', function () {
        formAgendamento.reset();
        selectHorario.disabled = true;
        selectHorario.innerHTML = '<option value = "">Selecione primeiro uma data</option>';

        resumoAgendamento.classList.add('hidden');
        formAgendamento.classList.remove('hidden');
    });
});

