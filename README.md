
# Guía de Instalación

1. Comienza clonando este proyecto en tu estación de trabajo.

```bash
  git clone https://github.com/jeanpier05/app-nodejs-codechallenge.git
```
2. Iniciar contenedores

```bash
docker-compose up
```
Asegurarse todo esté activo

![App Screenshot](https://raw.githubusercontent.com/jeanpier05/images/main/docker-composer.png)

3. Iniciar microservicio anti-fraude

Acceder a la carpeta anti-fraud-ms

**Instalación**

```bash
$ npm install
```

**Renombrar .env.template a .env**

**Ejecutar aplicación**

```bash
# watch mode
$ npm run start:dev
```

4. Iniciar microservicio transaction

Acceder a la carpeta transaction-ms

**Instalación**

```bash
$ npm install
```

**Renombrar .env.template a .env**

**Ejecutar aplicación**

```bash
# watch mode
$ npm run start:dev
```

5. Iniciar api/graphql
Acceder a la carpeta "api"

**Instalación**

```bash
$ npm install
```

**Renombrar .env.template a .env**

**Ejecutar aplicación**

```bash
# watch mode
$ npm run start:dev
```

Utilizar API en http://localhost:3000/graphql

Query para creación de transacción
```javascript
mutation {
    createTransaction(createTransactionData: 
      { 
        accountExternalIdDebit: "b1178d22-70d3-4d29-b19c-7a5f06523a19", 
        accountExternalIdCredit: "29ba16ca-9ffd-49f0-aa44-823a2a4ddbfd", 
        tranferTypeId: 2, 
        value: 900
      }) {
      transactionExternalId,
      transactionType {
        transactionTypeName
      },
      transactionStatus {
        transactionStatusName
      },
      value,
      createdAt
    }
}
```

Ejemplo de query para consulta de transacción
```javascript
query {
  transaction(transactionExternalId: "e3a06f7b-d086-4ad5-b547-6799d5bd9aab") {
    transactionExternalId
    transactionType {
      transactionTypeName
    }
    transactionStatus {
      transactionStatusName
    }
    value
    createdAt
  }
}

```

# Prueba - Flujo de Transacción

Crear transacción. Registra con estado 'pending'

![App Screenshot](https://raw.githubusercontent.com/jeanpier05/images/main/transaction_pending.png)

Mensaje recibido por ms anti-fraude: transacción pendiente. Solo evalúa regla de monto
![App Screenshot](https://raw.githubusercontent.com/jeanpier05/images/main/anti-fraud.png)

Mensaje recibido por ms transacción: transacción 'approved' o 'rejected'. Actualiza estado final de transacción
![App Screenshot](https://raw.githubusercontent.com/jeanpier05/images/main/transaction_final.png)

Consulta a consola postgres database
![App Screenshot](https://raw.githubusercontent.com/jeanpier05/images/main/posgrest.png)

Consulta en graphql
![App Screenshot](https://raw.githubusercontent.com/jeanpier05/images/main/query-graphql.png)

## Yape Code Challenge

[Problem](https://github.com/yaperos/app-nodejs-codechallenge/blob/main/README.md)
## Authors

- [@jeanpier05](https://github.com/jeanpier05)
- Jeans Pierre Graos Neciosup

