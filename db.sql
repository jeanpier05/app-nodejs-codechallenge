DROP DATABASE IF EXISTS yape;
CREATE DATABASE yape;
\c yape;

CREATE TABLE public.transactions(
	"transactionExternalId" varchar(36) NOT NULL,
    "accountExternalIdDebit" varchar(36) NOT NULL,
    "accountExternalIdCredit" varchar(36) NOT NULL,
	"transactionTypeId" int4 NOT NULL,
	"transactionStatusId" int4 NOT NULL,
	amount DECIMAL(10, 2)  NOT NULL,
	"createdAt" timestamp NULL DEFAULT now(),
	CONSTRAINT transaction_key PRIMARY KEY ("transactionExternalId")
);

CREATE TABLE public.transactiontype (
	id int4 NOT NULL,
	"transactionTypeName" varchar NULL
);

CREATE TABLE public.transactionstatus (
	id int4 NOT NULL,
	"transactionStatusName" varchar NULL
);


insert into transactiontype
(id, "transactionTypeName")
values
(1, 'credit');

insert into transactiontype
(id, "transactionTypeName")
values
(2, 'debit');

insert into transactionstatus
(id, "transactionStatusName")
values
(1 ,'pending');

insert into transactionstatus 
(id, "transactionStatusName")
values
(2 , 'approved');

insert into transactionstatus
(id, "transactionStatusName")
values
(3, 'rejected');