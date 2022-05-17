# Cadastro de carro

### **RF**
Deve ser possível cadastrar um novo carro.<br />
Deve ser possível listar todas as categorias.

### **RN**
Não deve ser possível cadastrar um carro com uma placa já existente.<br/>
Não deve ser possível alterar a placada de um carro já cadastrado.<br/>
O carro deve ser cadastrado, por padrão, com disponibilidade. <br/>
O usuário responsável pelo cadastro deve ser um administrador. <br/>

# Listagem de carros

### **RF**
Deve ser possível listar todos os carros disponíveis. <br/>
Deve ser possível listar todos os carros disponíveis pela nome da categoria. <br/>
Deve ser possível listar todos os carros disponíveis pelo nome da marca. <br/>
Deve ser possível listar todos os carros disponíveis pela nome do carro. <br/>

### **RN**
O usuário não precisar estar logado no sistema.

# Cadastro de Especificação no carro

### **RF**
Deve ser possível cadastrar uma espeficação para um carro.<br/>
Deve ser possível listar as espeficações. <br/>
Deve ser possível listar todos os carros. <br />

### **RN**
Não deve ser possível cadastrar uma espeficação para um carro não cadastrado. <br/>
Não deve ser possível cadastrar uma espeficação já existente para o mesmo carro. <br/>
O usuário responsável pelo cadastro deve ser um administrador. <br/>

# Cadastro de imagens do carro

### **RF**
Deve ser possível cadastrar a imagem do carro.<br/>
Deve ser possível listar todos os carros. <br />

### **RNF**
Utilizar o multer para o upload dos arquivos.

### **RN**
O usuário deve poder cadastrar mais de uma imagem para o mesmo carro.<br/>
O usuário responsável pelo cadastro deve ser um administrador. <br/>

# Aluguel de carro

### **RF**
Deve ser possível cadastrar um aluguel. <br/>

### **RN**
O aluguel deve ter duração mínima de 24 horas. <br/>
Não deve ser possível cadastrar um novo aluguel, caso já exista um aberto, para o mesmo usuário. <br />
Não deve ser possível cadastrar um novo aluguel, caso já exista um aberto, para o mesmo carro. <br />

