CREATE DATABASE IF NOT EXISTS ClinicaMedica;
USE ClinicaMedica;

CREATE TABLE PlanoSaude (
    idPlanoSaude INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    numero VARCHAR(50) NOT NULL,
    limiteCobertura DECIMAL(10,2) NOT NULL,
    dataVencimento DATE NOT NULL
);

CREATE TABLE Paciente (
    idPaciente INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    endereco VARCHAR(150) NOT NULL,
    dataNascimento DATE NOT NULL,
    telefone VARCHAR(20),
    email VARCHAR(100),
    cpf VARCHAR(14) NOT NULL UNIQUE,
    idPlanoSaude INT,
    FOREIGN KEY (idPlanoSaude) REFERENCES PlanoSaude(idPlanoSaude)
);

CREATE TABLE Medico (
    idMedico INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    especialidade VARCHAR(100) NOT NULL,
    crm VARCHAR(20) NOT NULL UNIQUE,
    telefone VARCHAR(20),
    email VARCHAR(100)
);

CREATE TABLE Consulta (
    idConsulta INT AUTO_INCREMENT PRIMARY KEY,
    data DATE NOT NULL,
    hora TIME NOT NULL,
    status VARCHAR(20) DEFAULT 'Agendada',
    valor DECIMAL(10,2) NOT NULL,
    idPaciente INT NOT NULL,
    idMedico INT NOT NULL,
    FOREIGN KEY (idPaciente) REFERENCES Paciente(idPaciente),
    FOREIGN KEY (idMedico) REFERENCES Medico(idMedico)
);

CREATE TABLE ReceitaMedica (
    idReceita INT AUTO_INCREMENT PRIMARY KEY,
    descricaoMedicamento TEXT NOT NULL,
    dosagem VARCHAR(100) NOT NULL,
    tempoTratamento INT NOT NULL,
    dataEmissao DATE NOT NULL,
    idConsulta INT NOT NULL,
    FOREIGN KEY (idConsulta) REFERENCES Consulta(idConsulta)
);

CREATE TABLE Pagamento (
    idPagamento INT AUTO_INCREMENT PRIMARY KEY,
    valor DECIMAL(10,2) NOT NULL,
    dataPagamento DATE NOT NULL,
    formaPagamento VARCHAR(50),
    status VARCHAR(20) DEFAULT 'Pago',
    idConsulta INT NOT NULL,
    FOREIGN KEY (idConsulta) REFERENCES Consulta(idConsulta)
);

CREATE TABLE RelatorioFinanceiro (
    idRelatorio INT AUTO_INCREMENT PRIMARY KEY,
    dataEmissao DATE NOT NULL,
    valorTotal DECIMAL(12,2),
    totalConsultas INT
);
