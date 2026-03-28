const STORAGE_KEYS = {
  catalog: "ministerio-multitracks-catalog-v13",
  catalogBackup: "ministerio-multitracks-catalog-backup-v6",
  catalogMigrations: "ministerio-multitracks-catalog-migrations-v5",
  deletedCatalogKeys: "ministerio-multitracks-deleted-catalog-keys-v1",
  preferences: "ministerio-multitracks-preferences-v5",
  adminConfig: "ministerio-multitracks-admin-config-v2",
  adminSession: "ministerio-multitracks-admin-session-v2",
  cloudAdminKey: "ministerio-multitracks-cloud-admin-key-v2",
  appMeta: "ministerio-multitracks-app-meta-v1",
  memberSession: "ministerio-multitracks-member-session-v1",
  accessSession: "ministerio-multitracks-access-session-v1",
  rememberedAccess: "ministerio-multitracks-remembered-access-v1"
};

const SEED_CATALOG_ENABLED = true;
const ENABLED_SEED_PRODUCERS = new Set(["elite", "alagoa"]);

const CATALOG_MIGRATIONS = {
  replaceAlagoaMarch2026: "2026-03-27-replace-alagoa-catalog-v1",
  replaceEliteMarch2026: "2026-03-27-replace-elite-catalog-v1"
};

const WEEKLY_SELECTOR_ROTATION = ["Daniela", "Mileide", "Tamires"];
const WEEKLY_SELECTOR_ANCHOR = {
  year: 2026,
  month: 3,
  day: 23
};

const COVER_ASSET_DB = {
  name: "ministerio-multitracks-cover-assets",
  store: "covers",
  version: 1
};

const PRODUCERS = {
  elite: {
    id: "elite",
    name: "Multitracks Elite",
    headline: "Tela dedicada ao produtor Elite",
    copy: "Use esta area para acessar, pesquisar e tocar as musicas do produtor Elite.",
    accent: "#f2bf63",
    softAccent: "rgba(242, 191, 99, 0.12)",
    strongAccent: "rgba(242, 191, 99, 0.22)",
    shadow: "rgba(242, 191, 99, 0.16)"
  },
  alagoa: {
    id: "alagoa",
    name: "Multitracks Alagoa",
    headline: "Tela dedicada ao produtor Alagoa",
    copy: "Use esta area para manter separado o repertorio que vem do produtor Alagoa.",
    accent: "#51c5b4",
    softAccent: "rgba(81, 197, 180, 0.12)",
    strongAccent: "rgba(81, 197, 180, 0.22)",
    shadow: "rgba(81, 197, 180, 0.16)"
  }
};

const seedGroups = [
  {
    producer: "elite",
    source: "Acervo Elite",
    tracks: [
      "4 por 1 - Cinco Pães e Dois Peixinhos",
      "4 por 1 - Diante de Ti",
      "4 por 1 - Diante de Ti (Arranjo Elite)",
      "4 por 1 - Espírito Enche Minha Vida",
      "4 por 1 - Um Chamado",
      "Abertura Elite 3.0",
      "Adhemar de Campos - Grande é o Senhor",
      "Adhemar de Campos - Louvemos ao Senhor",
      "Alexsander Lúcio - Buscar-me-Eis e Me Achareis",
      "Alexsander Lúcio - O Fogo Arderá",
      "Aline Barros (Sem Backs) - Tudo é Teu",
      "Aline Barros + Sarah Beatriz - A Promessa Nasceu",
      "Aline Barros - Ao Erguermos As Mãos",
      "Aline Barros - Ao Único",
      "Aline Barros - Apaixonado",
      "Aline Barros - Autor da Vida",
      "Aline Barros - Bem Aventurado",
      "Aline Barros - Bem Mais Que Tudo",
      "Aline Barros - Consagração",
      "Aline Barros - Depois da Cruz",
      "Aline Barros - Diante da Cruz",
      "Aline Barros - Digno é o Senhor",
      "Aline Barros - Esperança",
      "Aline Barros - Eternidade + Imensurável",
      "Aline Barros - Imensurável",
      "Aline Barros - Jeová Jireh",
      "Aline Barros - Lugar Seguro",
      "Aline Barros - Medley Fico Feliz + Feliz Demais",
      "Aline Barros - Medley O Espírito de Deus Está Aqui",
      "Aline Barros - Não Há Deus Maior",
      "Aline Barros - Poder do Teu Amor",
      "Aline Barros - Poder Pra Salvar",
      "Aline Barros - Primeira Essência",
      "Aline Barros - Rei Meu",
      "Aline Barros - Rendido Estou",
      "Aline Barros - Ressuscita-me",
      "Aline Barros - Ressuscita-me 30 Anos",
      "Aline Barros - Sonda-me, Usa-me",
      "Aline Barros - Te Adorar é o Meu Prazer",
      "Aline Barros - Tua Palavra",
      "Aline Barros - Tudo Diferente",
      "Aline Barros - Tudo é Teu",
      "Aline Barros - Vitória No Deserto",
      "Aline Barros - Vou Te Alegrar",
      "Aline Silva - Em Nome de Jesus",
      "Alisson e Neide - Paulo e Silas",
      "Ana Nóbrega - Quando Ele Vem",
      "Anderson Freire - Efésios 6",
      "Anderson Freire - Medley",
      "Anderson Freire - Raridade",
      "André Valadão - Milagre",
      "André Valadão - Pela Fé",
      "Anna Clara Rocha - Fogo em Teus Olhos",
      "Antônio Cirilo - Poderoso Deus",
      "Attos 2 - Escape",
      "Attos 2 - Na Unção de Deus",
      "Banda Som e Louvor - Medley 500 Graus",
      "Be One Music - Rei do Meu Coração",
      "Bethel Music - Agnus Day",
      "Bruna Karla - Advogado Fiel",
      "Bruna Karla - Quando Eu Chorar",
      "Canção e Louvor - Rei e Santo",
      "Cantares - Maravilhoso És",
      "Cassiane + Gabriel Guedes - Com Muito Louvor",
      "Cassiane - Amigo Espírito Santo",
      "Cassiane - Grandes Sucessos",
      "Cassiane - Hino da Vitória",
      "Cassiane - O Leão e o Cordeiro",
      "Central 3 - Tudo a Ver Com Ele",
      "Cia SALT - Eu Quero Conhecer Jesus",
      "Comunhão e Adoração 4 - Comunhão e Adoração",
      "Comunhão e Adoração - Nuvem de Glória",
      "Comuni. Evangélica de Maringá - Descansarei",
      "Comunidade de Nilópolis - Cria Em Mim",
      "Comunidade de Nilópolis - Deus Sara Esta Nação",
      "Comunidade Zona Sul - Rompendo em Fé",
      "Damares - Consolador",
      "Daniel - Até Que Eu Não Consiga Mais Ficar de Pé",
      "Danielle Cristina - Fidelidade",
      "Davi Fernandes - Até Que o Senhor Venha",
      "Davi Sacer - Desejo do Meu Coração",
      "Davi Sacer - Deus de Promessas",
      "Davi Sacer - Deus Não Falhará",
      "Davi Sacer - Sete Vezes Mais",
      "Davi Sacer - Tua Graça Me Basta",
      "Davi Sacer - Venha o Teu Reino",
      "David Quinlan - Abra os Olhos do Meu Coração",
      "David Quinlan - Abraça-me",
      "David Quinlan - Agnus Dei",
      "David Quinlan - Águas Profundas",
      "David Quinlan - Essência da Adoração",
      "Deigma Marques - Que Ele Cresça",
      "Delino Marçal - Deus é Deus",
      "Delino Marçal - Vim Falar Com Deus",
      "Delino Marçal - Você Não Imagina",
      "Diante do Trono - Me Ama",
      "Diante do Trono - Medley Coração Igual ao Teu",
      "Diante do Trono - Medley Relance",
      "Diante do Trono - Medley Te Agradeço",
      "Diante do Trono - Nos Braços do Pai",
      "Diante do Trono - Preciso de Ti",
      "Diante do Trono - Tempo de Festa",
      "Discopraise - Ouvir o Teu Falar",
      "Discopraise - Se Eu Me Humilhar",
      "Drops - É Ele",
      "Drops - Grato Sou",
      "Drops - Maravilhosa Graça",
      "Drops - Tudo é Teu",
      "Dunamis Music - Estações",
      "Elaine de Jesus - Na Unção de Deus",
      "Elaine Martins - Santificação",
      "Elia Oliveira - Te Adorarei",
      "Elevation - Praise (Louve)",
      "Eli Soares - Aos Pés da Cruz",
      "Eli Soares - Casa de Deus",
      "Eli Soares - Deus Cuida de Mim",
      "Eli Soares - Deus Forte",
      "Eli Soares - Ele É",
      "Eli Soares - Ele é Exaltado",
      "Eli Soares - Grande é o Senhor",
      "Eli Soares - Jeová é o Teu Cavaleiro",
      "Eli Soares - Os Anjos te Louvam",
      "Eli Soares - Porque Ele Vive",
      "Eli Soares - Santo, Santo, Santo",
      "Eli Soares - Se Eu Cair",
      "Eli Soares - Tu És Soberano",
      "Eli Soares - Tudo Que Eu Sou",
      "Eli Soares - Vem Com Josué Lutar em Jericó",
      "Eliezer e Marcelo - Dependente",
      "Emaus Music - Medley Digno de Tudo",
      "Emaus Music - Refúgio",
      "Ericka Nascimento - Vida Aos Sepulcros",
      "Esther Fiuax - Adoração Exclusiva",
      "Eyshila + Midian Lima - Medley Posso Clamar",
      "Eyshila - Nada Pode Calar Um Adorador",
      "Eyshila - O Milagre Sou Eu",
      "Fabiana Anastácio - Sou Eu",
      "Felipe Rodrigues + Marcus Salles - Amo o Senhor",
      "Felipe Rodrigues - Aclame ao Senhor",
      "Felipe Rodrigues - Até Que o Senhor Venha",
      "Felipe Rodrigues - Digno é o Senhor",
      "Felipe Rodrigues - Eu Sou do Meu Amado",
      "Felipe Rodrigues - Eu Sou Teu",
      "Felipe Rodrigues - Fiel é Deus",
      "Felipe Rodrigues - Melhor Lugar",
      "Felipe Rodrigues - Primeira Essência",
      "Felipe Rodrigues - Tudo é Perda",
      "Fernanda Brum - Amo o Senhor",
      "Fernanda Brum - Apenas Um Toque",
      "Fernanda Brum - Há Liberdade",
      "Fernanda Brum - O Que Sua Glória Fez Comigo",
      "Fernanda Brum - Onde o Fogo Não Apaga",
      "Fernanda Brum - Puro Nardo",
      "Fernanda Brum - Redenção",
      "Fernanda Brum - Tua Glória",
      "Fernanda Brum - Yeshua",
      "Fernanda Madaloni - Canção do Apocalipse",
      "Fernanda Madaloni - Medley",
      "Fernanda Madaloni - Porque Ele Vive",
      "Fernandinho - A Alegria do Senhor",
      "Fernandinho - Agindo Deus",
      "Fernandinho - Alvo Mais Que a Neve",
      "Fernandinho - Cidade Santa",
      "Fernandinho - Dançar Na Chuva",
      "Fernandinho - Deus Não Está Morto",
      "Fernandinho - Eis Que Estou à Porta",
      "Fernandinho - Faz Chover",
      "Fernandinho - Grandes Coisas",
      "Fernandinho - Há Um Rio",
      "Fernandinho - Jesus, Filho de Deus",
      "Fernandinho - Medley Seu Sangue",
      "Fernandinho - Mil Cairão",
      "Fernandinho - Nada Além do Sangue",
      "Fernandinho - Não Mais Escravos",
      "Fernandinho - O Hino",
      "Fernandinho - Os Que Confiam",
      "Fernandinho - Os Teus Sonhos",
      "Fernandinho - Resiliência",
      "Fernandinho - Se Não For Pra Ti Adorar",
      "Fernandinho - Seu Sangue",
      "Fernandinho - Sou Feliz",
      "Fernandinho - Todas As Coisas",
      "Fernandinho - Tu És Fiel",
      "Fernandinho - Um Dia em Tua Casa",
      "Fernandinho - Uma Coisa Peço Ao Senhor",
      "Fernandinho - Uma Nova História (Acústico)",
      "Fernandinho - Venha o Teu Reino",
      "Fernandinho - Yeshua",
      "Fhop Music - A Boa Parte",
      "Fhop Music - Bendito é o Rei",
      "Fhop Music - Canção Eterna",
      "Fhop Music - Colossenses e Suas Linhas de Amor",
      "Fhop Music - Gratidão",
      "Fhop Music - Há Poder",
      "Fhop Music - Indesculpável",
      "Fhop Music - Meia Noite",
      "Fhop Music - Sublime",
      "Fhop Music - Tu És + Águas Purificadoras",
      "Fhop Music - Uma Vez",
      "Fhop Music - Único",
      "Fhop Music - Único 2.0",
      "Gabi Sampaio - Ambição",
      "Gabi Sampaio - Medley Eu Vou Construir",
      "Gabriel Guedes - A Benção",
      "Gabriel Guedes - Canta Minh'Alma",
      "Gabriel Guedes - Ele Vem",
      "Gabriel Guedes - In Memoriam",
      "Gabriel Guedes - Nada Mais",
      "Gabriel Guedes - Santo Pra Sempre",
      "Gabriel Guedes - Vitorioso És",
      "Gabriel Guedes - Vitorioso És, És o Amor",
      "Gabriela Rocha + Fernandinho - Creio Em Ti",
      "Gabriela Rocha - A Ele a Glória + Porque Ele Vive",
      "Gabriela Rocha - Agnus Dei",
      "Gabriela Rocha - Atos 2",
      "Gabriela Rocha - Creio Que Tu És a Cura",
      "Gabriela Rocha - Deus Está Aqui",
      "Gabriela Rocha - Espírito Enche Minha Vida",
      "Gabriela Rocha - Eu Navegarei",
      "Gabriela Rocha - Eu Sou Teu",
      "Gabriela Rocha - Eu Sou Teu 2.0",
      "Gabriela Rocha - Leão",
      "Gabriela Rocha - Lugar Secreto",
      "Gabriela Rocha - Me Atraiu",
      "Gabriela Rocha - Medley Meu Coração é Teu",
      "Gabriela Rocha - Medley Meu Respirar",
      "Gabriela Rocha - Medley Nada Além de Ti",
      "Gabriela Rocha - Medley Poderoso Deus",
      "Gabriela Rocha - Medley Senhor Formoso És",
      "Gabriela Rocha - Medley TGS",
      "Gabriela Rocha - Pra Onde Iremos",
      "Gabriela Rocha - Teu Santo Nome",
      "Gabriela Rocha - Teu Santo Nome 2.0",
      "Gabriela Rocha - Toda Terra",
      "Gabriela Rocha - Vida Aos Sepulcros",
      "Gabriela Rocha - Vida Aos Sepulcros (Edit)",
      "Gerson Rufino - Eu Só Quero Adorar",
      "Get Worship - Derrama o Meu Perfume",
      "Get Worship - Senhor, Tu És Bom",
      "Get Worship - Uma Carta Viva",
      "Get Worship - Um Novo Dia",
      "Gézi Monteiro - Medley Meu Prazer",
      "Guilherme Baptista - Medley Te Louvarei",
      "Heloísa Rosa - Estou Livre",
      "Heloísa Rosa - Há Um Lugar",
      "Heloísa Rosa - Jesus é o Caminho",
      "IBAB - Bondade de Deus",
      "IBAB - Canta Minh'Alma",
      "IBAB - Eu Me Rendo",
      "IBAB - Me Derramar",
      "IBAB - Medley Tributo Yeovah",
      "Igor Zolla - Atrai O Meu Coração",
      "Ihonas Serra - Furioso Oceano",
      "Ipalpha - Ao Pé da Cruz",
      "Ipalpha - És o Rei Que Vem",
      "Ipalpha - Vinho e Pão",
      "Isaías Saad - Enche-me",
      "Isaías Saad - Medley Águas Purificadoras",
      "Isaías Saad - Medley Ruja o Leão",
      "Isaías Saad - Ousado Amor",
      "Isaías Saad - Senhor dos Exércitos",
      "Isadora Pompeo - Bençãos Que Não Têm Fim",
      "Isadora Pompeo - Minha Alma Te Ama",
      "Israel Nogueira - Medley Pode Morar Aqui",
      "Israel Salazar - Barulho de Festa",
      "Israel Salazar - Canção Ao Cordeiro",
      "Israel Salazar - Graça",
      "Israel Salazar - No Meio dos Louvores",
      "Jefferson e Suellen - Acende Outra Vez",
      "Jefferson e Suellen - Cordeiro e Leão",
      "Jefferson e Suellen - Ele Reina",
      "Jefferson e Suellen - Ele Vem",
      "Jefferson e Suellen - Foi Na Cruz",
      "Jefferson e Suellen - Labareda",
      "Jefferson e Suellen - Vem Me Buscar",
      "Josué Freitas - Medley João 20",
      "Juliano Son - Eu Vou Construir",
      "Juliano Son - Milagres",
      "Julliany Souza - Canção Que Não Envelhece",
      "Julliany Souza - Colossenses 1",
      "Julliany Souza - Deus é Quem Me Fortalece",
      "Julliany Souza - Leão de Judá",
      "Julliany Souza - Lindo Momento",
      "Julliany Souza - Quem é Esse",
      "Júlia Vitória - Além do Rio Azul",
      "Júlia Vitória - Canção dos Redimidos",
      "Júlia Vitória - De Dentro Pra Fora",
      "Júlia Vitória - João Viu + Além do Rio Azul",
      "Júlia Vitória - Nós Te Adoramos",
      "Júlia Vitória - Som das Águas",
      "KF - Estamos de Pé",
      "Kailane Frauches - Eu Vou Fazer",
      "Kailane Frauches - Passa Lá em Casa Jesus",
      "Kailane Frauches - Remanescentes",
      "Kaleb e Josh - Aviva-nos Medley",
      "Kemilly Santos - Deus de Obras Completas",
      "Kemilly Santos - Resistência",
      "Kemuel - Algo Novo",
      "Kemuel - Oh Quão Lindo Esse Nome É",
      "Kleber Lucas - Eu Vou Seguir Com Fé",
      "Kleber Lucas - Meu Alvo é Cristo",
      "Kleber Lucas - Pra Valer a Pena",
      "Kleber Lucas - Te Agradeço",
      "Lagoinha Worship - Grato Sou",
      "Lauriete - Igual Não Há",
      "Lauriete - Palavras",
      "Leandro Borges - Medley Clássicos",
      "Leonardo Gonçalves - Getsemani",
      "Livres Para Adorar - Mais Forte Que a Morte",
      "Livres Para Adorar - Quando o Mundo Cai ao Meu Redor",
      "Livres Para Adorar - Vai Valer a Pena",
      "Louvor Aliança - Medley Igreja Pequena",
      "Ludmila Ferber - Nunca Pare de Lutar",
      "Ludmila Ferber - Os Sonhos de Deus",
      "Lukas Agustinho - Medley Escudo",
      "Lukas Agustinho - Medley Sião",
      "Luma Elpídio - Liberta-me de Mim",
      "Marcelo Markes - Além do Impossível",
      "Marcelo Markes - Eu Tenho Você",
      "Marcelo Markes - Messias",
      "Marcelo Markes - Sinto Fluir",
      "Marcus Salles - Cordeiro e o Leão",
      "Marcus Salles - Estamos de Pé",
      "Marcus Salles - Medley Até Que Ele Venha",
      "Marcus Salles - Ruja o Leão",
      "Marcus Salles - Teu Amor Não Falha",
      "Marcus Salles - Vim para Adorar-Te",
      "Maria Marçal - Deixa",
      "Marine Friesen - Alfa e Ômega",
      "Marine Friesen - Óleo de Alegria",
      "Marquinho Gomes - Não Há Deus Maior",
      "Mateus Brito - Medley Ruja o Leão",
      "Midian Lima - Jó",
      "Midian Lima - Olharei Pro Alto",
      "Ministério Apascentar - Deus do Impossível",
      "Ministério Apascentar - Restitui",
      "Ministério Apascentar - Toque No Altar",
      "Ministério Avivah - Maranata",
      "Ministério Avivah - Pra Sempre",
      "Ministério Cristo Vivo - Teu Reino",
      "Ministério Ipiranga - Ressuscita",
      "Ministério Ipiranga - Última Chance",
      "Ministério Sarando a Terra - Deus do Secreto",
      "Ministério Toque No Altar - Aleluia Hosana",
      "Ministério Trazendo a Arca - Celebre",
      "Ministério Trazendo a Arca - Entre a Fé e a Razão",
      "Ministério Trazendo a Arca - Lembra Senhor",
      "Ministério Trazendo a Arca - Marca da Promessa",
      "Ministério Trazendo a Arca - O Chão Vai Tremer",
      "Ministério Trazendo a Arca - Olha Pra Mim",
      "Ministério Trazendo a Arca - Senhor e Rei",
      "Ministério Trazendo a Arca - Serás Sempre Deus",
      "Ministério Trazendo a Arca - Sobre As Águas",
      "Ministério Trazendo a Arca - Sobre As Águas 2.0",
      "Ministério Trazendo a Arca - Te Louvarei",
      "Ministério Trazendo a Arca - Trazendo a Arca",
      "Ministério Zoe - Aquieta Minh'Alma",
      "Minist. Toque No Altar - Eu Vou Viver Uma Virada",
      "Morada - Emaús",
      "Morada - É Tudo Sobre Você",
      "Morada - Medley Em Espírito",
      "Morada - Medley Eu Te Agradeço",
      "Morada - Medley Leão de Judá",
      "Morada - Medley Sonda-me",
      "Morada - Medley Tu és Santo",
      "Morada - Pra Onde Eu Irei",
      "Morada - Só Tu És Santo",
      "Nazarenos - O Grande Eu Sou",
      "Nívea Soares & Ítalo Gonçalves - Em Tua Presença",
      "Nívea Soares - Enche Este Lugar",
      "Nívea Soares - Eu Vou Construir",
      "Nívea Soares - Filho do Deus Vivo",
      "Nívea Soares - Maravilhado",
      "Nívea Soares - Não Seremos Abalados",
      "Nívea Soares - Que Se Abram os Céus",
      "Nívea Soares - Quem é Como o Nosso Deus",
      "Nívea Soares - Rio",
      "Nívea Soares - Tempo de Adorar",
      "Nívea Soares - Teu Amor Não Falha",
      "Nívea Soares - Um Só",
      "Novo Canto + Julliany Souza - Colossenses 1",
      "O Canto das Igrejas - Tu És Deus",
      "Oficina G3 - Ele Vive",
      "Oficina G3 - Incondicional",
      "One Voice - Medley Santo Pra Sempre",
      "Paloma Possi - Santo dos Santos",
      "Paulo César Baruk - Agradeço",
      "Paulo César Baruk - Cantarei Teu Amor",
      "Paulo César Baruk - Clamo Jesus",
      "Paulo César Baruk - Ele Continua Sendo Bom",
      "Paulo César Baruk - Em Teus Braços",
      "Paulo César Baruk - Jesus Em Tua Presença",
      "Paulo César Baruk - Me Atraiu",
      "Paulo César Baruk - Reina Em Mim",
      "Paulo César Baruk - Santo Espírito",
      "Paulo César Baruk - Sossegai",
      "Paulo César Baruk - Te Agradeço",
      "Pedras Vivas - Ó Noite Santa",
      "Pedras Vivas - Pai Nosso",
      "Pedro Henrique - Só Tu És Santo",
      "Peter Quintino - O Nosso General é Cristo",
      "Produção Elite - Medley Eu Quero é Deus",
      "Projeto Sola - Até Outra Vez",
      "Quatro Por Um - Diante de Ti",
      "Rachael Novaes - Tudo O Que Eu Mais Quero",
      "Raiz Coral - A Coroa",
      "Raiz Worship - Vencendo Vem Jesus",
      "Rapha Gonçalves - Sobre as Águas",
      "Rebeca Carvalho - Ele Me Ama",
      "Renascer Praise - Escape",
      "Renascer Praise - Eu Vou Clamar",
      "Renascer Praise - Há Um Lugar",
      "Renascer Praise - Hosana",
      "Renascer Praise - Jesus o Plano Perfeito",
      "Renascer Praise - Mil Graus",
      "Renascer Praise - Novo Dia, Novo Tempo",
      "Renascer Praise - Pelo Sangue",
      "Renascer Praise - Santo, Santo, Santo",
      "Renascer Praise - Ser Conhecido de Deus",
      "Ronaldo Bezerra - Tu És Santo",
      "Sala do Groove - Me Faz Viver",
      "Samuel Dias - Como Flecha",
      "Samuel Messias - A Glória Desta Última Casa",
      "Samuel Messias - Eu Não Perdi o Controle",
      "Samuel Messias - Os Planos de Deus",
      "Samuel Messias - Toda Via Me Alegrarei",
      "Samuel Tayrone - Que Presença é Essa",
      "Sara Evelyn - Um Pouco Mais",
      "Sara Oliveira - Caia Fogo",
      "Sarah Beatriz - O Maior Vilão Sou Eu",
      "Sarah Beatriz - O Poder do Teu Amor",
      "Sarah Beatriz - Toda Via Me Alegrarei",
      "Sarah Farias - Deixa Eu Te Usar",
      "Sarah Farias - O Rosto de Cristo",
      "Sarah Farias - Se Eu Não Te Ouvir",
      "Sarah Oliveira - Cadeias Quebrar",
      "Sérgio Lopes - Tente Lembrar",
      "Shirley Carvalhaes + Anderson Freire - Vendavais",
      "Soraya Moraes - Cadeias Quebrar",
      "Soraya Moraes - Caminho No Deserto",
      "Soraya Moraes - Quão Grande é o Meu Deus",
      "Stella Laura - O Senhor é o Meu Pastor",
      "Sued Silva - Na Fenda da Rocha",
      "Sued Silva - O Nome Dele é Jesus",
      "Sued Silva - Reacende a Chama",
      "Thalles Roberto - A Resposta",
      "Thalles Roberto - Arde Outra Vez",
      "Thalles Roberto - Com Muito Louvor",
      "Thalles Roberto - Desapareceu Um Povo",
      "Thalles Roberto - Deus da Minha Vida",
      "Thalles Roberto - Me Faz Viver",
      "Thamires Garcia - A Tua Mesa Cura",
      "Theo Rubia + Fernandinho - Ninguém Pode Parar",
      "Theo Rubia - Eu Só Quero Tua Presença",
      "Theo Rubia - Medley Nada Além do Sangue",
      "Theo Rubia - Um Milhão de Anos",
      "Toque No Altar - Leva-me Além",
      "Trazendo a Arca - Meu Melhor",
      "Valesca Mayssa - Boa Obra",
      "Valesca Mayssa - Eis-me Aqui",
      "Valesca Mayssa - Eu Sou Teu Pai",
      "Valesca Mayssa - Inflama",
      "Valesca Mayssa - Medley Dias de Guerra",
      "Valesca Mayssa - O Encontro",
      "Vigília dos Asafes - Poder Pra Salvar",
      "Vineyard - Entrega",
      "Vineyard - Meu Respirar",
      "Vineyard - Quebrantado",
      "Vineyard - Reina Em Mim",
      "Vineyard - Santo",
      "Vineyard - Senhor, Te Quero",
      "Vineyard - Vem, Está é a Hora",
      "Vineyard - Vim Para Adorar-te",
      "Wesley Santos - Cantai ao Senhor",
      "Wesley Santos - Grandioso És Tu",
      "Wesley Santos - O Rei Está Voltando",
      "Yasmim Versão Elite - O Fogo Arderá"
    ]
  },
  {
    producer: "alagoa",
    source: "Acervo Alagoa",
    tracks: [
      "Adhemar de Campos - Grande é o Senhor",
      "Alice Maciel - Sua Presença",
      "Aline Barros - Primeira Essência (Ao Vivo)",
      "Aline Barros - Casa do Pai",
      "Aline Barros - Digno é o Senhor",
      "Aline Barros - Imensurável",
      "Aline Barros - Jeová Jireh",
      "Aline Barros - Para Sempre Te Adorarei",
      "Aline Barros - Recomeçar",
      "Aline Barros - Santidade",
      "Aline Barros - Sou Mais Que Vencedor",
      "Aline Barros - Soube Que Me Amavas",
      "Aline Barros e Fernandinho - Rendido Estou",
      "Anderson Freire - A Glória é Tua",
      "Anderson Freire - A Igreja Vem",
      "Anderson Freire - Canção do Céu",
      "Anderson Freire - Igual Não Há",
      "Anderson Freire e Bruna Karla - Identidade",
      "Anderson Freire - Efésios 6",
      "Anderson Freire feat. Gisele Nascimento - O Mapa do Tesouro (Ao Vivo)",
      "Andréa Fontes - João Viu (Ao Vivo)",
      "Arianne - Deserto",
      "Avivah - Maranata",
      "Brás Adoração - Vem Cantar Louvores",
      "Bruna Karla - Força",
      "Bruna Karla - Pai, Eu Confiarei",
      "Canção e Louvor - Dependente",
      "Canção e Louvor - Eu Quero Mais",
      "Canção e Louvor - Eu Sou Mistério",
      "Canção e Louvor - O Céu Desceu",
      "Canção e Louvor - Rei e Santo",
      "Canção e Louvor - Salmo 24",
      "Cassiane - Amigo Espírito Santo",
      "Cassiane - Lugar da Tua Presença",
      "Cassiane - Não Abro Mão",
      "Cassiane - O Leão e o Cordeiro",
      "Cassiane - O Segredo",
      "Cassiane - O Todo-Poderoso",
      "Cassiane - Tremendo e Santo",
      "Cassiane - Vou Seguir",
      "Cassiane e Gabriela Rocha - Minha Bênção (Ao Vivo)",
      "Cassiane feat. Fernanda Brum - Imagine (Ao Vivo)",
      "Chagas Sobrinho - É Como um Sonho",
      "Charles Ben - Eu Me Rendo",
      "Cícero Oliveira - Quem Tem Jesus Tem Tudo",
      "Comunidade Zona Sul - O Nosso General é Cristo",
      "Coral Resgate - Envolve-me",
      "Cristina Mel - Jerusalém e Eu",
      "Damares - Consolador",
      "Damares - Sacrifício e Adoração",
      "Danielle Cristina - Deus Tu És Santo",
      "Diante do Trono - Preciso de Ti (Ao Vivo)",
      "Elaine de Jesus - Quem Chora Pra Deus",
      "Elaine Martins - Santificação",
      "Eli Soares, Álvaro Tito - Não Há Barreiras",
      "Eliã Oliveira - No Tempo D’Ele",
      "Eliã Oliveira - O Céu em Ação",
      "Eliã Oliveira - Salmos 91",
      "Eliane Fernandes - Presença",
      "Eliane Fernandes - Vai Passar",
      "Esteves Jacinto - Oração e Vitória",
      "Eyshila - Casa de Bênção",
      "Eyshila - Fiel a Mim",
      "Fabiana Anastácio - Adorarei",
      "Fabiana Anastácio - Sou Eu",
      "Fernanda Brum - A Visão da Glória",
      "Fernanda Brum - Amo o Senhor",
      "Fernanda Brum - Cura-me",
      "Fernanda Brum - Eu Vejo a Glória",
      "Fernanda Brum - Eu Vou",
      "Fernanda Brum - O Que Tua Glória Fez Comigo",
      "Fernanda Brum - Onde o Fogo Não Apaga",
      "Fernanda Brum - Santo (Holy)",
      "Fernandinho - Moisés",
      "Fernandinho Moises EDIT FINAL",
      "Fernandinho - Os Que Confiam",
      "Fernandinho - Único",
      "Gabriela Rocha - Hino da Vitória",
      "Gabriela Rocha - Me Atraiu",
      "Gabriela Rocha, Jéssica Augusto - Canção do Céu",
      "Gerson Rufino - Eu Só Quero Adorar",
      "Gerson Rufino - Vai Passar",
      "Grande Coral da UMADEB - Medley",
      "IBAB Celebração - Bondade de Deus",
      "Isaías Saad - Bondade de Deus",
      "Isaías Saad + Nívea Soares - Ruja o Leão / Que Se Abram os Céus",
      "Israel Nogueira - Oferta Agradável a Ti",
      "Israel Salazar - No Meio dos Louvores",
      "Jairo Bonfim - Ressurreto",
      "Jefferson e Suellen - Ele Reina",
      "Jefferson e Suellen - Jesus no Barco",
      "Jefferson e Suellen - Labareda",
      "Jéssica Augusto - A Última Palavra é Dele",
      "Jozyanne - Abra os Meus Olhos",
      "Jozyanne e Cassiane - Santidade",
      "Jozyanne e Midian Lima - Sinto o Teu Poder",
      "Jozyanne, Midian Lima, Nathália Braga e Pedro Henrique - Meu Milagre",
      "Kailane Frauches - Era a Mão de Deus",
      "Kailane Frauches - Passa Lá em Casa Jesus",
      "Kellen Byanca - Está Tudo Bem",
      "Kellen Byanca e Jessé Aguiar - Por Causa Dele",
      "Kemilly Santos, Damares - Se o Mar Não Se Abrir, Firme nas Promessas",
      "Larissa Pires - A Tua Palavra",
      "Lauriete - Deus dos Deuses",
      "Lauriete - Igual Não Há",
      "Lauriete - João Viu",
      "Leandro Borges - O Rei Está Voltando",
      "Lukas Agustinho - O Escudo + Sou Um Milagre",
      "Lukas Agustinho, Samuel Messias, Eliezer de Tarsis - Louve",
      "Marcus Salles - Estamos de Pé",
      "Maria Marçal - Deixa",
      "Maria Marçal - Uma Coisa Nova",
      "Mariana Aguiar - Porque Ele Vive",
      "Marine Friesen - Santo Pra Sempre",
      "Medley - Arrebatamento",
      "Medley - João 20",
      "Michele Nascimento - Louve e Adore",
      "Michele Nascimento - Portões Celestiais",
      "Midian Lima - Medley Corinhos de Fogo",
      "Midian Lima - Não Pare (10K)",
      "Midian Lima - Prioridade",
      "Midian Lima - Shekinah",
      "Midian Lima - Tu És Adorado",
      "Ministério Hebrom - Rendição",
      "Ministério Sarando a Terra Ferida - O Novo de Deus",
      "Morada - Jesus em Tua Presença",
      "Nívea Soares - Nenhum Deus Como Tu (Ao Vivo)",
      "Paulo César Baruk - Oh Glória",
      "Pedro Henrique - Posso Clamar",
      "Quatro Por Um - Cinco Pães e Dois Peixinhos",
      "Rachael Novaes e Paulo César Baruk - O Amor de Deus",
      "Rayanne Vanessa - Comandante Supremo",
      "Rayanne Vanessa - Eu Cuido",
      "Rayanne Vanessa - Imutável",
      "Rayanne Vanessa - Quem Me Vê Cantando",
      "Rayssa e Ravel - Consolador",
      "Renascer Praise - Escape",
      "Renascer Praise - Jesus, o Plano Perfeito",
      "Rose Nascimento - Lázaro, o Amigo Especial",
      "Ruthe Dayanne feat. Eliã Oliveira - O Grande é Ele",
      "Samuel Mariano - Deus Escrevendo",
      "Samuel Messias - Os Planos de Deus",
      "Samuel Messias - Você Não Vai Parar",
      "Sandra Pires - Poderosamente Vivo",
      "Sara Evelyn - Vem Senhor",
      "Sarah Beatriz - Eu Creio",
      "Sarah Farias - Deixa Eu Te Usar",
      "Sarah Farias - O Rosto de Cristo",
      "Sarah Farias - Se Eu Não Te Ouvir",
      "Sarah Farias - Sobrevivi",
      "Shirley Carvalhaes - Deus Tremendo",
      "Shirley Carvalhaes - Faraó ou Deus",
      "Shirley Carvalhaes - Vendavais",
      "Shirley Carvalhaes - Acima das Estrelas",
      "Som e Louvor - Corinhos 6: Festa de Crente",
      "Som e Louvor - Vem com Josué",
      "Som e Louvor e Stella Laura - Quem Viver Verá",
      "Soraya Moraes - Caminho no Deserto",
      "SoulLivre e Kemuel - Não Mais Escravos",
      "Stella Laura - Vem Senhor",
      "Stella Laura, Sara Evelyn e Carol Tauber - Vem Senhor",
      "Sued Silva - Existe Vida Aí",
      "Sued Silva - O Nome DEle",
      "Trio Nascimento - Chegou o Avivamento",
      "Trio Nascimento - Medley",
      "Valesca Mayssa - Boa Obra",
      "Valesca Mayssa - Dia Após Dia",
      "Valesca Mayssa - Eis-me Aqui",
      "Valesca Mayssa - Eu Sou Teu Pai",
      "Valesca Mayssa e Stella Laura - Dias de Guerra",
      "Vanessa Carvalho - Cicatrizes",
      "Vanilda Bordieri - Na Tua Presença",
      "Vitória Souza - Livramento",
      "Voz da Verdade - Além do Rio Azul",
      "Voz da Verdade - O Escudo",
      "Voz da Verdade - Sou um Milagre (Ao Vivo)",
      "Weslei Santos - Maranata"
    ]
  }
];

const elements = {
  heroStats: document.querySelector("#hero-stats"),
  screenElite: document.querySelector("#screen-elite"),
  screenAlagoa: document.querySelector("#screen-alagoa"),
  screenBanner: document.querySelector("#screen-banner"),
  recentAdditionsPanel: document.querySelector("#recent-additions-panel"),
  weeklySelectionsPanel: document.querySelector("#weekly-selections-panel"),
  searchInput: document.querySelector("#search-input"),
  favoritesFilterButton: document.querySelector("#favorites-filter-button"),
  workspaceGrid: document.querySelector(".workspace-grid"),
  songsTitle: document.querySelector("#songs-title"),
  songsCount: document.querySelector("#songs-count"),
  songList: document.querySelector("#song-list"),
  viewerPanel: document.querySelector(".viewer-panel"),
  songViewer: document.querySelector("#song-viewer"),
  lyricsModal: document.querySelector("#lyrics-modal"),
  lyricsViewer: document.querySelector("#lyrics-viewer"),
  openAdminButton: document.querySelector("#open-admin-button"),
  openUsersButton: document.querySelector("#open-users-button"),
  openAssetsButton: document.querySelector("#open-assets-button"),
  memberLogoutButton: document.querySelector("#member-logout-button"),
  memberLoginOverlay: document.querySelector("#member-login-overlay"),
  memberLoginForm: document.querySelector("#member-login-form"),
  memberLoginFlash: document.querySelector("#member-login-flash"),
  rememberAccessLogin: document.querySelector("#remember-access-login"),
  adminModal: document.querySelector("#admin-modal"),
  adminModalEyebrow: document.querySelector("[data-admin-modal-eyebrow]"),
  adminModalTitle: document.querySelector("#admin-modal-title"),
  adminModalActions: document.querySelector("#admin-modal-actions"),
  adminAuthView: document.querySelector("#admin-auth-view"),
  adminDashboardView: document.querySelector("#admin-dashboard-view"),
  adminFlash: document.querySelector("#admin-flash"),
  coverBatchInput: document.querySelector("#cover-batch-input")
};

const state = {
  catalog: [],
  activeProducer: getInitialProducer(),
  query: "",
  favoritesOnly: false,
  favorites: new Set(),
  manualRotationOffset: 0,
  weeklySelectedSongIds: [],
  weeklySelectionOwners: {},
  weeklySelectionWeekKey: "",
  coverAssets: new Map(),
  selectedSongId: null,
  lyricsMinistryMode: false,
  adminLoggedIn: false,
  adminModalMode: "create",
  syncMode: "local",
  editingSongId: null,
  adminCoverDraftUrl: "",
  adminCoverDraftChanged: false,
  adminProducerFilter: getInitialProducer(),
  adminFilter: "",
  deletedCatalogKeys: new Set(),
  cloudAdminKey: "",
  rotationNames: [...WEEKLY_SELECTOR_ROTATION],
  rotationAnchor: `${WEEKLY_SELECTOR_ANCHOR.year}-${String(WEEKLY_SELECTOR_ANCHOR.month).padStart(2, "0")}-${String(WEEKLY_SELECTOR_ANCHOR.day).padStart(2, "0")}`,
  memberLoginRequired: false,
  memberAccounts: [],
  memberRecords: [],
  currentMemberUsername: "",
  currentAccessHash: "",
  currentAccessRole: "guest",
  memberLoggedIn: false,
  rememberedAccess: null,
  isMigratingCatalog: false,
  isRestoringSeedCatalog: false,
  isClearingAllCovers: false,
  isResettingCloudCatalog: false,
  isBatchUploadingCovers: false,
  flashMessage: "",
  flashType: ""
};

let flashTimerId = null;
let cloudEndpoint = "";
let coverAssetDbPromise = null;
let sharedStateSyncTimerId = null;
let cloudRefreshTimerId = null;
let cloudRefreshPromise = null;

function registerServiceWorker() {
  if (!("serviceWorker" in navigator) || location.protocol === "file:") {
    return;
  }

  window.addEventListener("load", async () => {
    try {
      await navigator.serviceWorker.register("./sw.js");
    } catch (error) {
      console.error("Nao consegui registrar o service worker.", error);
    }
  });
}

function getInitialProducer() {
  return location.hash === "#alagoa" ? "alagoa" : "elite";
}

function cleanText(value) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

function cleanMultilineText(value) {
  return String(value || "")
    .replace(/\r\n?/g, "\n")
    .split("\n")
    .map((line) => line.trimEnd())
    .join("\n")
    .trim();
}

function preserveInputText(value) {
  return String(value || "");
}

function sanitizeSongIdList(input) {
  if (!Array.isArray(input)) {
    return [];
  }

  const uniqueIds = [];
  const seenIds = new Set();

  for (const value of input) {
    const normalizedValue = cleanText(value);

    if (!normalizedValue || seenIds.has(normalizedValue)) {
      continue;
    }

    seenIds.add(normalizedValue);
    uniqueIds.push(normalizedValue);
  }

  return uniqueIds;
}

function sanitizeWeeklySelectionOwners(input) {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return {};
  }

  const nextOwners = {};

  for (const [songId, username] of Object.entries(input)) {
    const normalizedSongId = cleanText(songId);
    const normalizedUsername = cleanText(username);

    if (!normalizedSongId || !normalizedUsername) {
      continue;
    }

    nextOwners[normalizedSongId] = normalizedUsername;
  }

  return nextOwners;
}

function hasOwn(target, key) {
  return Boolean(target) && Object.prototype.hasOwnProperty.call(target, key);
}

function normalizeManualRotationOffset(value) {
  const numericValue = Number(value);
  return Number.isFinite(numericValue) ? numericValue : 0;
}

function normalizeSearch(value) {
  return cleanText(value)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function normalizeBatchCoverKey(value) {
  return normalizeSearch(value).replace(/[^a-z0-9]/g, "");
}

function getAppConfig() {
  const config = window.MINISTERIO_APP_CONFIG || {};
  const googleSheetsConfig = config.googleSheets || {};

  return {
    syncMode: cleanText(config.syncMode).toLowerCase() || "local",
    googleSheets: {
      webAppUrl: cleanText(googleSheetsConfig.webAppUrl),
      requestTimeoutMs: Number(googleSheetsConfig.requestTimeoutMs) || 20000
    }
  };
}

function isGoogleSheetsConfigured() {
  const config = getAppConfig();
  return config.syncMode === "google-sheets" && Boolean(config.googleSheets.webAppUrl);
}

function hasGoogleSheetsSupport() {
  return typeof window.fetch === "function";
}

function isCloudModeActive() {
  return state.syncMode === "cloud" && Boolean(cloudEndpoint);
}

function escapeHtml(value) {
  return String(value || "").replace(/[&<>"']/g, (character) => {
    const map = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "\"": "&quot;",
      "'": "&#39;"
    };

    return map[character] || character;
  });
}

function buildArtworkMonogram(title, artist) {
  const source = cleanText(`${title || ""} ${artist || ""}`) || "Ministerio Multitracks";
  const letters = source
    .split(/\s+/)
    .map((part) => normalizeSearch(part).replace(/[^a-z0-9]/g, "").slice(0, 1).toUpperCase())
    .filter(Boolean)
    .slice(0, 2);

  return letters.join("") || "MT";
}

function resolveSongCoverUrl(songLike) {
  const cloudCoverFileId = cleanText(songLike?.coverFileId);

  if (cloudCoverFileId) {
    return `https://drive.google.com/thumbnail?id=${encodeURIComponent(cloudCoverFileId)}&sz=w1600`;
  }

  const directCoverUrl = cleanText(songLike?.coverUrl);
  if (directCoverUrl) {
    return directCoverUrl;
  }

  const coverAssetId = cleanText(songLike?.coverAssetId);
  if (!coverAssetId) {
    return "";
  }

  return cleanText(state.coverAssets.get(coverAssetId));
}

function renderArtworkMarkup(songLike, variant = "card") {
  const coverUrl = resolveSongCoverUrl(songLike);
  const title = cleanText(songLike?.title) || "Musica";
  const artist = cleanText(songLike?.artist) || "Ministerio";
  const monogram = buildArtworkMonogram(title, artist);

  if (!coverUrl) {
    return `
      <div class="cover-shell cover-${variant} is-placeholder" aria-hidden="true">
        <span>${escapeHtml(monogram)}</span>
      </div>
    `;
  }

  return `
    <div class="cover-shell cover-${variant}">
      <img
        src="${escapeHtml(coverUrl)}"
        alt="Capa de ${escapeHtml(title)}"
        loading="lazy"
        data-fallback-text="${escapeHtml(monogram)}"
      >
    </div>
  `;
}

function mapCloudSongToRecord(row = {}) {
  return createSongRecord({
    id: row.id,
    producer: row.producer,
    artist: row.artist,
    title: row.title,
    lyrics: row.lyrics,
    notes: row.notes,
    source: row.source,
    coverUrl: row.coverUrl,
    coverFileId: row.coverFileId,
    youtubeUrl: row.youtubeUrl,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt
  });
}

function mapRecordToCloudSong(song = {}) {
  return {
    id: cleanText(song.id),
    producer: cleanText(song.producer) === "alagoa" ? "alagoa" : "elite",
    artist: cleanText(song.artist),
    title: cleanText(song.title),
    lyrics: cleanMultilineText(song.lyrics),
    notes: cleanText(song.notes),
    source: cleanText(song.source),
    coverUrl: cleanText(song.coverUrl),
    coverFileId: cleanText(song.coverFileId),
    youtubeUrl: cleanText(song.youtubeUrl),
    createdAt: song.createdAt || new Date().toISOString(),
    updatedAt: song.updatedAt || new Date().toISOString()
  };
}

function readCloudAdminKey() {
  try {
    return cleanText(sessionStorage.getItem(STORAGE_KEYS.cloudAdminKey));
  } catch (_error) {
    return "";
  }
}

function writeCloudAdminKey(value) {
  const normalizedValue = cleanText(value);

  try {
    if (normalizedValue) {
      sessionStorage.setItem(STORAGE_KEYS.cloudAdminKey, normalizedValue);
      return;
    }

    sessionStorage.removeItem(STORAGE_KEYS.cloudAdminKey);
  } catch (_error) {
    // ignora falhas de sessao
  }
}

function buildGoogleDriveCoverUrl(fileId, fallbackUrl = "") {
  const normalizedFileId = cleanText(fileId);

  if (!normalizedFileId) {
    return cleanText(fallbackUrl);
  }

  return `https://drive.google.com/thumbnail?id=${encodeURIComponent(normalizedFileId)}&sz=w1600`;
}

function dataUrlToBlob(dataUrl) {
  const [meta, encoded] = String(dataUrl || "").split(",");
  const mimeMatch = meta?.match(/data:(.*?);base64/);
  const mimeType = mimeMatch?.[1] || "image/jpeg";
  const binary = atob(encoded || "");
  const buffer = new Uint8Array(binary.length);

  for (let index = 0; index < binary.length; index += 1) {
    buffer[index] = binary.charCodeAt(index);
  }

  return new Blob([buffer], { type: mimeType });
}

function getCoverExtensionFromUrl(url) {
  const value = cleanText(url);

  if (value.startsWith("data:image/png")) {
    return "png";
  }

  if (value.startsWith("data:image/webp")) {
    return "webp";
  }

  return "jpg";
}

function wrapIdbRequest(request) {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error || new Error("Falha ao acessar as capas locais."));
  });
}

function getCoverAssetDb() {
  if (!("indexedDB" in window)) {
    return Promise.resolve(null);
  }

  if (!coverAssetDbPromise) {
    coverAssetDbPromise = new Promise((resolve, reject) => {
      const request = window.indexedDB.open(COVER_ASSET_DB.name, COVER_ASSET_DB.version);

      request.onupgradeneeded = () => {
        const database = request.result;
        if (!database.objectStoreNames.contains(COVER_ASSET_DB.store)) {
          database.createObjectStore(COVER_ASSET_DB.store);
        }
      };

      request.onsuccess = () => {
        const database = request.result;
        database.onversionchange = () => database.close();
        resolve(database);
      };

      request.onerror = () => reject(request.error || new Error("Falha ao abrir o banco das capas."));
    }).catch((error) => {
      console.error("Nao consegui abrir o banco local das capas.", error);
      coverAssetDbPromise = null;
      return null;
    });
  }

  return coverAssetDbPromise;
}

async function loadCoverAssetsFromDb() {
  const database = await getCoverAssetDb();
  state.coverAssets = new Map();

  if (!database) {
    return;
  }

  await new Promise((resolve, reject) => {
    const transaction = database.transaction(COVER_ASSET_DB.store, "readonly");
    const store = transaction.objectStore(COVER_ASSET_DB.store);
    const request = store.openCursor();

    request.onsuccess = () => {
      const cursor = request.result;

      if (!cursor) {
        resolve();
        return;
      }

      state.coverAssets.set(cleanText(cursor.key), cleanText(cursor.value));
      cursor.continue();
    };

    request.onerror = () => reject(request.error || new Error("Falha ao ler as capas locais."));
  }).catch((error) => {
    console.error("Nao consegui carregar as capas locais.", error);
    state.coverAssets = new Map();
  });
}

async function saveCoverAsset(assetId, dataUrl) {
  const normalizedAssetId = cleanText(assetId);
  const normalizedDataUrl = cleanText(dataUrl);
  const database = await getCoverAssetDb();

  if (!normalizedAssetId || !normalizedDataUrl || !database) {
    return false;
  }

  try {
    const transaction = database.transaction(COVER_ASSET_DB.store, "readwrite");
    const store = transaction.objectStore(COVER_ASSET_DB.store);
    await wrapIdbRequest(store.put(normalizedDataUrl, normalizedAssetId));
    state.coverAssets.set(normalizedAssetId, normalizedDataUrl);
    return true;
  } catch (error) {
    console.error("Nao consegui salvar a capa no armazenamento local.", error);
    return false;
  }
}

async function deleteCoverAsset(assetId) {
  const normalizedAssetId = cleanText(assetId);
  const database = await getCoverAssetDb();

  if (!normalizedAssetId) {
    return false;
  }

  state.coverAssets.delete(normalizedAssetId);

  if (!database) {
    return false;
  }

  try {
    const transaction = database.transaction(COVER_ASSET_DB.store, "readwrite");
    const store = transaction.objectStore(COVER_ASSET_DB.store);
    await wrapIdbRequest(store.delete(normalizedAssetId));
    return true;
  } catch (error) {
    console.error("Nao consegui remover a capa do armazenamento local.", error);
    return false;
  }
}

async function clearLocalCoverAssets(assetIds = []) {
  const normalizedIds = new Set([
    ...assetIds,
    ...state.coverAssets.keys()
  ].map((assetId) => cleanText(assetId)).filter(Boolean));

  for (const assetId of normalizedIds) {
    await deleteCoverAsset(assetId);
  }

  if (!normalizedIds.size) {
    state.coverAssets = new Map();
  }
}

async function migrateEmbeddedCoversToIndexedDb() {
  if (!state.catalog.length) {
    return;
  }

  let hasChanges = false;
  const nextCatalog = [];

  for (const song of state.catalog) {
    const embeddedCoverUrl = cleanText(song.coverUrl);

    if (!embeddedCoverUrl.startsWith("data:image/")) {
      nextCatalog.push(song);
      continue;
    }

    const coverAssetId = cleanText(song.coverAssetId) || cleanText(song.id) || buildId();
    const saved = await saveCoverAsset(coverAssetId, embeddedCoverUrl);

    if (!saved) {
      nextCatalog.push(song);
      continue;
    }

    nextCatalog.push(createSongRecord({
      ...song,
      coverUrl: "",
      coverAssetId
    }));
    hasChanges = true;
  }

  if (!hasChanges) {
    return;
  }

  state.catalog = nextCatalog;
  saveCatalogSnapshot();
}

function buildCloudCoverPath(songId, producer, extension = "jpg") {
  const safeSongId = cleanText(songId) || buildId();
  const safeProducer = cleanText(producer) === "alagoa" ? "alagoa" : "elite";
  return `${safeProducer}/${safeSongId}-${Date.now()}.${extension}`;
}

function normalizeStoredCatalog(input) {
  return Array.isArray(input) ? input.map((song) => createSongRecord(song)) : [];
}

function sortCatalogSongs(catalog) {
  return [...normalizeStoredCatalog(catalog)].sort((leftSong, rightSong) => {
    return compareText(leftSong.artist, rightSong.artist) || compareText(leftSong.title, rightSong.title);
  });
}

function getSongCompletenessScore(song) {
  return [
    cleanMultilineText(song.lyrics),
    cleanText(song.notes),
    cleanText(song.youtubeUrl),
    cleanText(song.coverUrl),
    cleanText(song.coverAssetId),
    cleanText(song.coverFileId)
  ].filter(Boolean).length;
}

function pickPreferredSongRecord(currentSong, nextSong) {
  const currentScore = getSongCompletenessScore(currentSong);
  const nextScore = getSongCompletenessScore(nextSong);

  if (nextScore !== currentScore) {
    return nextScore > currentScore ? nextSong : currentSong;
  }

  const currentUpdatedAt = new Date(currentSong.updatedAt || currentSong.createdAt || 0).getTime();
  const nextUpdatedAt = new Date(nextSong.updatedAt || nextSong.createdAt || 0).getTime();

  return nextUpdatedAt >= currentUpdatedAt ? nextSong : currentSong;
}

function dedupeCatalogSongs(catalog) {
  const songsByKey = new Map();

  for (const song of normalizeStoredCatalog(catalog)) {
    const key = buildSongCatalogKey(song) || `id:${cleanText(song.id)}`;
    const currentSong = songsByKey.get(key);

    songsByKey.set(key, currentSong ? pickPreferredSongRecord(currentSong, song) : song);
  }

  return sortCatalogSongs([...songsByKey.values()]);
}

function loadAppliedCatalogMigrations() {
  const stored = readJson(STORAGE_KEYS.catalogMigrations, []);
  return Array.isArray(stored) ? stored.map((entry) => cleanText(entry)).filter(Boolean) : [];
}

function saveAppliedCatalogMigrations(migrations) {
  writeJson(STORAGE_KEYS.catalogMigrations, migrations.map((entry) => cleanText(entry)).filter(Boolean));
}

function readDeletedCatalogKeys() {
  const stored = readJson(STORAGE_KEYS.deletedCatalogKeys, []);
  return Array.isArray(stored) ? stored.map((entry) => cleanText(entry)).filter(Boolean) : [];
}

function writeDeletedCatalogKeys(keys) {
  writeJson(STORAGE_KEYS.deletedCatalogKeys, keys.map((entry) => cleanText(entry)).filter(Boolean));
}

function getDeletedCatalogKeysSet() {
  if (state.deletedCatalogKeys instanceof Set && state.deletedCatalogKeys.size) {
    return new Set([...state.deletedCatalogKeys].map((entry) => cleanText(entry)).filter(Boolean));
  }

  return new Set(readDeletedCatalogKeys());
}

function setDeletedCatalogKeys(keys) {
  const normalizedKeys = keys.map((entry) => cleanText(entry)).filter(Boolean);
  state.deletedCatalogKeys = new Set(normalizedKeys);
  writeDeletedCatalogKeys(normalizedKeys);
}

function markSongCatalogKeyDeleted(songLike) {
  const songKey = buildSongCatalogKey(songLike);

  if (!songKey) {
    return;
  }

  const nextKeys = getDeletedCatalogKeysSet();
  nextKeys.add(songKey);
  setDeletedCatalogKeys([...nextKeys]);
}

function clearSongCatalogKeyDeleted(songLike) {
  const songKey = buildSongCatalogKey(songLike);

  if (!songKey) {
    return;
  }

  const nextKeys = getDeletedCatalogKeysSet();
  nextKeys.delete(songKey);
  setDeletedCatalogKeys([...nextKeys]);
}

function filterDeletedCatalogSongs(catalog) {
  const deletedKeys = getDeletedCatalogKeysSet();
  const normalizedCatalog = normalizeStoredCatalog(catalog);

  if (!deletedKeys.size) {
    return normalizedCatalog;
  }

  return normalizedCatalog.filter((song) => !deletedKeys.has(buildSongCatalogKey(song)));
}

function mergeSeedSongWithExisting(seedSong, existingSong) {
  if (!existingSong) {
    return seedSong;
  }

  return createSongRecord({
    ...seedSong,
    id: existingSong.id || seedSong.id,
    lyrics: existingSong.lyrics,
    notes: existingSong.notes,
    coverUrl: existingSong.coverUrl,
    coverFileId: existingSong.coverFileId,
    coverAssetId: existingSong.coverAssetId,
    youtubeUrl: existingSong.youtubeUrl,
    createdAt: existingSong.createdAt || seedSong.createdAt,
    updatedAt: existingSong.updatedAt || seedSong.updatedAt
  });
}

function replaceProducerCatalogWithSeed(catalog, producer) {
  const safeProducer = cleanText(producer) === "alagoa" ? "alagoa" : "elite";
  const normalizedCatalog = dedupeCatalogSongs(catalog);
  const existingSongsByKey = new Map();

  for (const song of normalizedCatalog) {
    if (song.producer !== safeProducer) {
      continue;
    }

    const key = buildSongCatalogKey(song);

    if (key && !existingSongsByKey.has(key)) {
      existingSongsByKey.set(key, song);
    }
  }

  const replacementSongs = buildSeedCatalog()
    .filter((song) => song.producer === safeProducer)
    .map((seedSong) => mergeSeedSongWithExisting(seedSong, existingSongsByKey.get(buildSongCatalogKey(seedSong))))
    .sort((leftSong, rightSong) => compareText(leftSong.artist, rightSong.artist) || compareText(leftSong.title, rightSong.title));

  return sortCatalogSongs([
    ...normalizedCatalog.filter((song) => song.producer !== safeProducer),
    ...replacementSongs
  ]);
}

function buildSeedBackedCatalog(catalog) {
  const normalizedCatalog = dedupeCatalogSongs(catalog);
  const seedCatalog = dedupeCatalogSongs(buildSeedCatalog());

  if (!seedCatalog.length) {
    return normalizedCatalog;
  }

  const existingSongsByKey = new Map(
    normalizedCatalog
      .map((song) => [buildSongCatalogKey(song), song])
      .filter(([key]) => Boolean(key))
  );
  const seedKeys = new Set(seedCatalog.map((song) => buildSongCatalogKey(song)).filter(Boolean));
  const mergedSeedSongs = seedCatalog.map((seedSong) => mergeSeedSongWithExisting(seedSong, existingSongsByKey.get(buildSongCatalogKey(seedSong))));
  const extraSongs = normalizedCatalog.filter((song) => {
    const key = buildSongCatalogKey(song);
    return key ? !seedKeys.has(key) : true;
  });

  return sortCatalogSongs([...mergedSeedSongs, ...extraSongs]);
}

function applyCatalogMigrations(catalog, storageKey = "") {
  let nextCatalog = normalizeStoredCatalog(catalog);
  let changed = false;
  const appliedMigrations = new Set(loadAppliedCatalogMigrations());

  if (!appliedMigrations.has(CATALOG_MIGRATIONS.replaceAlagoaMarch2026)) {
    nextCatalog = replaceProducerCatalogWithSeed(nextCatalog, "alagoa");
    appliedMigrations.add(CATALOG_MIGRATIONS.replaceAlagoaMarch2026);
    changed = true;
  }

  if (!appliedMigrations.has(CATALOG_MIGRATIONS.replaceEliteMarch2026)) {
    nextCatalog = replaceProducerCatalogWithSeed(nextCatalog, "elite");
    appliedMigrations.add(CATALOG_MIGRATIONS.replaceEliteMarch2026);
    changed = true;
  }

  if (changed) {
    saveAppliedCatalogMigrations([...appliedMigrations]);

    if (storageKey) {
      writeJson(storageKey, nextCatalog);
    }
  }

  return nextCatalog;
}

function loadLocalCatalogSnapshot() {
  const stored = readJson(STORAGE_KEYS.catalog, null);

  if (Array.isArray(stored)) {
    return filterDeletedCatalogSongs(buildSeedBackedCatalog(applyCatalogMigrations(stored, STORAGE_KEYS.catalog)));
  }

  return filterDeletedCatalogSongs(buildSeedCatalog());
}

function loadLocalCatalogBackupSnapshot() {
  const stored = readJson(STORAGE_KEYS.catalogBackup, null);
  return filterDeletedCatalogSongs(buildSeedBackedCatalog(applyCatalogMigrations(stored, STORAGE_KEYS.catalogBackup)));
}

function saveCatalogSnapshot() {
  writeJson(STORAGE_KEYS.catalog, state.catalog);
}

function saveLocalCatalogBackupSnapshot(catalog = state.catalog) {
  writeJson(STORAGE_KEYS.catalogBackup, normalizeStoredCatalog(catalog));
}

function getMigrationSourceCatalog() {
  const backupCatalog = loadLocalCatalogBackupSnapshot();
  return backupCatalog.length ? backupCatalog : loadLocalCatalogSnapshot();
}

function songHasCover(song) {
  return Boolean(resolveSongCoverUrl(song));
}

function hasAnyKnownCover() {
  return state.catalog.some((song) => songHasCover(song))
    || getMigrationSourceCatalog().some((song) => songHasCover(song));
}

function buildBatchCoverLookup(producer) {
  const songs = getSongsByProducer(producer);
  const exactMap = new Map();
  const titleMap = new Map();

  for (const song of songs) {
    const exactKeys = [
      `${song.artist} ${song.title}`,
      `${song.artist} - ${song.title}`,
      `${song.artist}_${song.title}`,
      `${song.artist}${song.title}`
    ]
      .map((entry) => normalizeBatchCoverKey(entry))
      .filter(Boolean);

    for (const key of exactKeys) {
      exactMap.set(key, song.id);
    }

    const titleKey = normalizeBatchCoverKey(song.title);

    if (!titleKey) {
      continue;
    }

    if (titleMap.has(titleKey)) {
      titleMap.set(titleKey, null);
    } else {
      titleMap.set(titleKey, song.id);
    }
  }

  return {
    exactMap,
    titleMap
  };
}

function findSongForBatchCover(fileName, lookup) {
  const baseName = cleanText(fileName).replace(/\.[^.]+$/, "");
  const normalizedKey = normalizeBatchCoverKey(baseName);

  if (!normalizedKey) {
    return null;
  }

  const exactSongId = lookup.exactMap.get(normalizedKey);

  if (exactSongId) {
    return state.catalog.find((song) => song.id === exactSongId) || null;
  }

  const titleSongId = lookup.titleMap.get(normalizedKey);

  if (titleSongId) {
    return state.catalog.find((song) => song.id === titleSongId) || null;
  }

  return null;
}

function setAdminSessionFromCloud(session) {
  state.cloudAdminKey = cleanText(session);
  state.adminLoggedIn = Boolean(state.cloudAdminKey) && state.currentAccessRole === "admin";
}

async function ensureCloudClient() {
  if (!isGoogleSheetsConfigured() || !hasGoogleSheetsSupport()) {
    return null;
  }

  const config = getAppConfig();
  cloudEndpoint = cleanText(config.googleSheets.webAppUrl).replace(/\/$/, "");

  return {
    webAppUrl: cloudEndpoint,
    requestTimeoutMs: config.googleSheets.requestTimeoutMs
  };
}

async function requestCloudApi(action, payload = {}, options = {}) {
  const services = await ensureCloudClient();

  if (!services?.webAppUrl) {
    throw new Error("Google Sheets indisponivel.");
  }

  const {
    method = "POST",
    includeAdminKey = true
  } = options;

  const controller = typeof AbortController === "function" ? new AbortController() : null;
  const timeoutId = controller
    ? window.setTimeout(() => controller.abort(), services.requestTimeoutMs)
    : null;

  try {
    let response;

    if (method === "GET") {
      const query = new URLSearchParams({ action });
      response = await fetch(`${services.webAppUrl}?${query.toString()}`, {
        method: "GET",
        signal: controller?.signal
      });
    } else {
      const requestPayload = {
        action,
        ...payload
      };

      if (includeAdminKey) {
        requestPayload.adminKey = state.cloudAdminKey;
      }

      response = await fetch(services.webAppUrl, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain;charset=utf-8"
        },
        body: JSON.stringify(requestPayload),
        signal: controller?.signal
      });
    }

    const rawText = await response.text();
    let data = {};

    if (rawText) {
      try {
        data = JSON.parse(rawText);
      } catch (error) {
        throw new Error("O Apps Script respondeu com uma pagina invalida. Revise SHEET_ID, COVERS_FOLDER_ID e publique novamente o Web App.");
      }
    }

    if (!response.ok || data.ok === false) {
      const normalizedError = cleanText(data?.error);

      if (
        ["settings", "saveSharedState"].includes(cleanText(action))
        && /Acao (GET|POST) invalida/i.test(normalizedError)
      ) {
        throw new Error("O Apps Script publicado ainda esta desatualizado. Cole novamente o arquivo google-apps-script-backend.gs e publique o Web App.");
      }

      throw new Error(normalizedError || "Nao consegui falar com o Google Sheets.");
    }

    return data;
  } finally {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  }
}

async function refreshCloudAdminState() {
  if (!isGoogleSheetsConfigured()) {
    state.syncMode = "local";
    state.adminLoggedIn = state.currentAccessRole === "admin";
    state.cloudAdminKey = "";
    return;
  }

  const services = await ensureCloudClient();

  if (!services) {
    state.syncMode = "local";
    state.adminLoggedIn = state.currentAccessRole === "admin";
    state.cloudAdminKey = "";
    return;
  }

  state.syncMode = "cloud";
  state.cloudAdminKey = readCloudAdminKey();
  setAdminSessionFromCloud(state.cloudAdminKey);
}

async function fetchCloudCatalog(options = {}) {
  const {
    seedBacked = true,
    dedupe = true,
    includeDeleted = false
  } = options;
  const result = await requestCloudApi("catalog", {}, {
    method: "GET",
    includeAdminKey: false
  });
  const rows = Array.isArray(result?.songs) ? result.songs : [];
  const mappedRows = rows.map((row) => mapCloudSongToRecord(row));
  const normalizedRows = dedupe ? dedupeCatalogSongs(mappedRows) : normalizeStoredCatalog(mappedRows);
  const nextCatalog = seedBacked ? buildSeedBackedCatalog(normalizedRows) : normalizedRows;

  return includeDeleted ? nextCatalog : filterDeletedCatalogSongs(nextCatalog);
}

async function fetchCloudAppMeta() {
  if (!isGoogleSheetsConfigured()) {
    return readAppMetaCache();
  }

  try {
    const cloudMetaCache = readAppMetaCache();
    const result = await requestCloudApi("settings", {}, {
      method: "GET",
      includeAdminKey: false
    });
    const mergedMembers = mergeMemberAccountsWithLocalRecords(
      Array.isArray(result?.memberUsernames)
        ? result.memberUsernames.map((member) => cleanText(member)).filter(Boolean)
        : cloudMetaCache.memberAccounts
    );
      const nextMeta = {
        rotationNames: sanitizeRotationNames(result?.rotationNames),
        rotationAnchor: normalizeRotationAnchorValue(result?.rotationAnchor),
        memberLoginRequired: Boolean(result?.memberLoginRequired) || mergedMembers.memberAccounts.length > 0,
        memberAccounts: mergedMembers.memberAccounts,
        memberRecords: mergedMembers.memberRecords,
        favorites: sanitizeSongIdList(result?.favorites),
        manualRotationOffset: normalizeManualRotationOffset(result?.manualRotationOffset),
        weeklySelectionWeekKey: cleanText(result?.weeklySelectionWeekKey) || getCurrentWeekKey(),
        weeklySelectedSongIds: sanitizeSongIdList(result?.weeklySelectedSongIds),
        weeklySelectionOwners: sanitizeWeeklySelectionOwners(result?.weeklySelectionOwners)
      };

      writeAppMetaCache(nextMeta);
      return nextMeta;
  } catch (error) {
    console.warn("Nao consegui ler as configuracoes extras da nuvem. Mantendo o cache local.", error);
    return readAppMetaCache();
  }
}

function buildSharedAppStatePayload(source = state) {
  return {
    favorites: sanitizeSongIdList(source.favorites instanceof Set ? [...source.favorites] : source.favorites),
    manualRotationOffset: normalizeManualRotationOffset(source.manualRotationOffset),
    weeklySelectionWeekKey: cleanText(source.weeklySelectionWeekKey) || getCurrentWeekKey(),
    weeklySelectedSongIds: sanitizeSongIdList(source.weeklySelectedSongIds),
    weeklySelectionOwners: sanitizeWeeklySelectionOwners(source.weeklySelectionOwners)
  };
}

function getCurrentMemberAccessHash() {
  const normalizedCurrentUsername = normalizeSearch(state.currentMemberUsername);

  if (state.currentAccessHash && normalizedCurrentUsername) {
    return cleanText(state.currentAccessHash);
  }

  const session = readAccessSession();
  if (
    cleanText(session.role) === "member"
    && normalizeSearch(session.username) === normalizedCurrentUsername
    && cleanText(session.authHash)
  ) {
    return cleanText(session.authHash);
  }

  if (
    state.rememberedAccess?.username
    && state.rememberedAccess?.password
    && normalizeSearch(state.rememberedAccess.username) === normalizedCurrentUsername
  ) {
    return simpleHash(state.rememberedAccess.password);
  }

  return "";
}

function canSyncSharedStateToCloud() {
  if (!isCloudModeActive()) {
    return false;
  }

  if (isAdminUser()) {
    return Boolean(state.cloudAdminKey);
  }

  if (isMemberUser()) {
    return Boolean(cleanText(state.currentMemberUsername) && getCurrentMemberAccessHash());
  }

  return false;
}

async function saveSharedStateToCloud(sharedState = buildSharedAppStatePayload(), options = {}) {
  if (!canSyncSharedStateToCloud()) {
    return null;
  }

  const {
    silent = true
  } = options;
  const requestPayload = {
    sharedState
  };
  const requestOptions = {
    includeAdminKey: isAdminUser()
  };

  if (!isAdminUser()) {
    requestPayload.username = cleanText(state.currentMemberUsername);
    requestPayload.passwordHash = getCurrentMemberAccessHash();
  }

  try {
    const result = await requestCloudApi("saveSharedState", requestPayload, requestOptions);
    const nextSharedState = {
      favorites: sanitizeSongIdList(result?.sharedState?.favorites ?? sharedState.favorites),
      manualRotationOffset: normalizeManualRotationOffset(result?.sharedState?.manualRotationOffset ?? sharedState.manualRotationOffset),
      weeklySelectionWeekKey: cleanText(result?.sharedState?.weeklySelectionWeekKey ?? sharedState.weeklySelectionWeekKey) || getCurrentWeekKey(),
      weeklySelectedSongIds: sanitizeSongIdList(result?.sharedState?.weeklySelectedSongIds ?? sharedState.weeklySelectedSongIds),
      weeklySelectionOwners: sanitizeWeeklySelectionOwners(result?.sharedState?.weeklySelectionOwners ?? sharedState.weeklySelectionOwners)
    };

    writeAppMetaCache(nextSharedState);
    applyAppMeta(nextSharedState);
    return nextSharedState;
  } catch (error) {
    console.warn("Nao consegui sincronizar o estado compartilhado na nuvem.", error);

    if (!silent) {
      setFlash("Nao consegui sincronizar essa alteracao na nuvem agora.", "error");
    }

    throw error;
  }
}

function queueSharedStateSync(options = {}) {
  if (!canSyncSharedStateToCloud()) {
    return;
  }

  const {
    immediate = false,
    silent = true
  } = options;
  const nextSnapshot = buildSharedAppStatePayload();

  if (sharedStateSyncTimerId) {
    clearTimeout(sharedStateSyncTimerId);
  }

  sharedStateSyncTimerId = window.setTimeout(() => {
    sharedStateSyncTimerId = null;
    saveSharedStateToCloud(nextSnapshot, { silent }).catch(() => {
      // erro ja tratado na funcao
    });
  }, immediate ? 0 : 220);
}

async function refreshCloudState(options = {}) {
  if (!isGoogleSheetsConfigured() || !hasGoogleSheetsSupport()) {
    return;
  }

  if (cloudRefreshPromise) {
    return cloudRefreshPromise;
  }

  const {
    quiet = true
  } = options;

  cloudRefreshPromise = (async () => {
    try {
      await refreshCloudAdminState();
      const [cloudMeta, cloudCatalog] = await Promise.all([
        fetchCloudAppMeta(),
        fetchCloudCatalog()
      ]);

      applyAppMeta(cloudMeta);
      state.catalog = cloudCatalog;
      saveCatalogSnapshot();
      saveLocalCatalogBackupSnapshot(state.catalog);
      renderAll();
    } catch (error) {
      console.warn("Nao consegui atualizar os dados sincronizados agora.", error);

      if (!quiet) {
        setFlash("Nao consegui atualizar os dados sincronizados agora.", "error");
      }
    } finally {
      cloudRefreshPromise = null;
    }
  })();

  return cloudRefreshPromise;
}

async function saveRotationSettingsToCloud(rotationNames, rotationAnchor) {
  const result = await requestCloudApi("saveRotationSettings", {
    rotationNames: sanitizeRotationNames(rotationNames),
    rotationAnchor: normalizeRotationAnchorValue(rotationAnchor)
  });
  const mergedMembers = mergeMemberAccountsWithLocalRecords(
    Array.isArray(result?.memberUsernames)
      ? result.memberUsernames.map((member) => cleanText(member)).filter(Boolean)
      : state.memberAccounts
  );

  const nextMeta = {
    rotationNames: sanitizeRotationNames(result?.rotationNames),
    rotationAnchor: normalizeRotationAnchorValue(result?.rotationAnchor),
    memberLoginRequired: Boolean(result?.memberLoginRequired) || mergedMembers.memberAccounts.length > 0,
    memberAccounts: mergedMembers.memberAccounts,
    memberRecords: mergedMembers.memberRecords
  };

  writeAppMetaCache(nextMeta);
  applyAppMeta(nextMeta);
}

async function fetchCloudMembers() {
  const result = await requestCloudApi("listMembers");
  const nextMembers = Array.isArray(result?.members)
    ? result.members.map((member) => cleanText(member?.username)).filter(Boolean)
    : [];
  const mergedMembers = mergeMemberAccountsWithLocalRecords(nextMembers);

  const nextMeta = {
    rotationNames: state.rotationNames,
    rotationAnchor: state.rotationAnchor,
    memberLoginRequired: mergedMembers.memberAccounts.length > 0,
    memberAccounts: mergedMembers.memberAccounts,
    memberRecords: mergedMembers.memberRecords
  };

  writeAppMetaCache(nextMeta);
  applyAppMeta(nextMeta);
  return mergedMembers.memberAccounts;
}

async function saveMemberToCloud(username, password) {
  saveMemberLocally(username, password);

  try {
    const result = await requestCloudApi("saveMember", {
      username: cleanText(username),
      passwordHash: simpleHash(password)
    });

    const nextMembers = Array.isArray(result?.members)
      ? result.members.map((member) => cleanText(member?.username)).filter(Boolean)
      : state.memberAccounts;
    const mergedMembers = mergeMemberAccountsWithLocalRecords(nextMembers);

    const nextMeta = {
      rotationNames: state.rotationNames,
      rotationAnchor: state.rotationAnchor,
      memberLoginRequired: mergedMembers.memberAccounts.length > 0,
      memberAccounts: mergedMembers.memberAccounts,
      memberRecords: mergedMembers.memberRecords
    };

    writeAppMetaCache(nextMeta);
    applyAppMeta(nextMeta);
    return {
      savedInCloud: true
    };
  } catch (error) {
    console.warn("Nao consegui salvar o acesso do membro na nuvem. Mantendo salvo neste aparelho.", error);
    return {
      savedInCloud: false
    };
  }
}

async function deleteMemberFromCloud(username) {
  deleteMemberLocally(username);

  try {
    const result = await requestCloudApi("deleteMember", {
      username: cleanText(username)
    });

    const nextMembers = Array.isArray(result?.members)
      ? result.members.map((member) => cleanText(member?.username)).filter(Boolean)
      : state.memberAccounts.filter((member) => normalizeSearch(member) !== normalizeSearch(username));
    const mergedMembers = mergeMemberAccountsWithLocalRecords(nextMembers);

    const nextMeta = {
      rotationNames: state.rotationNames,
      rotationAnchor: state.rotationAnchor,
      memberLoginRequired: mergedMembers.memberAccounts.length > 0,
      memberAccounts: mergedMembers.memberAccounts,
      memberRecords: mergedMembers.memberRecords
    };

    writeAppMetaCache(nextMeta);
    applyAppMeta(nextMeta);
    return {
      removedFromCloud: true
    };
  } catch (error) {
    console.warn("Nao consegui remover o acesso do membro na nuvem. Mantendo a exclusao local.", error);
    return {
      removedFromCloud: false
    };
  }
}

async function signInMemberCloud(username, password) {
  const passwordHash = simpleHash(password);
  const result = await requestCloudApi("memberLogin", {
    username: cleanText(username),
    passwordHash
  }, {
    includeAdminKey: false
  });
  const normalizedUsername = cleanText(result?.username || username);

  state.currentMemberUsername = normalizedUsername;
  state.currentAccessHash = passwordHash;
  state.currentAccessRole = "member";
  state.cloudAdminKey = "";
  state.adminLoggedIn = false;
  state.memberLoggedIn = true;
  writeCloudAdminKey("");
  writeAccessSession("member", normalizedUsername, passwordHash);
  writeMemberSession(normalizedUsername);
}

async function uploadCoverToCloud(songId, producer, coverUrl) {
  const nextCoverUrl = cleanText(coverUrl);

  if (!nextCoverUrl || !nextCoverUrl.startsWith("data:image/")) {
    return nextCoverUrl;
  }

  const extension = getCoverExtensionFromUrl(nextCoverUrl);
  const result = await requestCloudApi("uploadCover", {
    songId: cleanText(songId),
    producer: cleanText(producer),
    coverDataUrl: nextCoverUrl,
    extension
  });

  return {
    coverUrl: buildGoogleDriveCoverUrl(result?.coverFileId, result?.coverUrl),
    coverFileId: cleanText(result?.coverFileId)
  };
}

async function saveSongToCloud(song) {
  const result = await requestCloudApi("saveSong", {
    song: mapRecordToCloudSong(song)
  });
  return mapCloudSongToRecord(result?.song || song);
}

async function deleteSongFromCloud(songId) {
  await requestCloudApi("deleteSong", {
    songId: cleanText(songId)
  });
}

function getCloudSongVariantGroup(rawCloudCatalog, songLike) {
  const normalizedCatalog = normalizeStoredCatalog(rawCloudCatalog);
  const targetSongId = cleanText(songLike?.id);
  const targetSongKey = buildSongCatalogKey(songLike);

  return normalizedCatalog.filter((song) => {
    if (targetSongId && cleanText(song.id) === targetSongId) {
      return true;
    }

    return Boolean(targetSongKey) && buildSongCatalogKey(song) === targetSongKey;
  });
}

async function deleteCloudSongVariants(songLike, rawCloudCatalog = [], keepSongId = "") {
  const keepId = cleanText(keepSongId);
  const variantDeleteCounts = new Map();

  for (const variant of getCloudSongVariantGroup(rawCloudCatalog, songLike)) {
    const variantId = cleanText(variant.id);

    if (!variantId) {
      continue;
    }

    variantDeleteCounts.set(variantId, (variantDeleteCounts.get(variantId) || 0) + 1);
  }

  for (const [variantId, count] of variantDeleteCounts.entries()) {
    const deleteCount = variantId === keepId ? Math.max(0, count - 1) : count;

    for (let index = 0; index < deleteCount; index += 1) {
      await deleteSongFromCloud(variantId);
    }
  }
}

async function signInCloudAdmin(username, adminKey) {
  await requestCloudApi("login", {
    username: cleanText(username),
    adminKey: cleanText(adminKey)
  }, {
    includeAdminKey: false
  });

  state.currentMemberUsername = cleanText(username);
  state.currentAccessHash = "";
  state.currentAccessRole = "admin";
  state.memberLoggedIn = false;
  state.cloudAdminKey = cleanText(adminKey);
  writeCloudAdminKey(state.cloudAdminKey);
  writeAccessSession("admin", state.currentMemberUsername || "admin");
  setAdminSessionFromCloud(state.cloudAdminKey);
}

async function signOutCloudAdmin() {
  state.currentAccessRole = "guest";
  state.currentMemberUsername = "";
  state.currentAccessHash = "";
  state.cloudAdminKey = "";
  writeCloudAdminKey("");
  writeAccessSession("", "");
  state.adminLoggedIn = false;
}

function signOutMember() {
  state.currentMemberUsername = "";
  state.currentAccessHash = "";
  state.currentAccessRole = "guest";
  state.memberLoggedIn = false;
  writeAccessSession("", "");
  writeMemberSession("");
}

async function migrateLocalCatalogToCloud() {
  if (!isCloudModeActive()) {
    setFlash("Ative o Google Sheets e entre como administrador antes de migrar o acervo.", "error");
    return;
  }

  const migrationSourceCatalog = buildSeedBackedCatalog(getMigrationSourceCatalog());

  if (!migrationSourceCatalog.length) {
    setFlash("Nao encontrei um acervo local para migrar.", "error");
    return;
  }

  const shouldMigrate = window.confirm(`Vou enviar ${migrationSourceCatalog.length} musicas locais para a nuvem. Deseja continuar?`);

  if (!shouldMigrate) {
    return;
  }

  state.isMigratingCatalog = true;
  renderAdminModalHead();
  setFlash("Migrando o acervo local para a nuvem...", "success");

  try {
    const currentCloudCatalog = await fetchCloudCatalog({
      seedBacked: false
    });
    const currentCloudSongsByKey = new Map(
      currentCloudCatalog
        .map((song) => [buildSongCatalogKey(song), song])
        .filter(([key]) => Boolean(key))
    );

    for (const song of migrationSourceCatalog) {
      const matchingCloudSong = currentCloudSongsByKey.get(buildSongCatalogKey(song));
      const localCoverUrl = resolveSongCoverUrl(song);
      const uploadedCover = localCoverUrl
        ? await uploadCoverToCloud(matchingCloudSong?.id || song.id, song.producer, localCoverUrl)
        : {
            coverUrl: cleanText(matchingCloudSong?.coverUrl),
            coverFileId: cleanText(matchingCloudSong?.coverFileId)
          };

      const persistedSong = createSongRecord({
        ...song,
        id: matchingCloudSong?.id || song.id,
        coverUrl: uploadedCover.coverUrl || song.coverUrl,
        coverFileId: uploadedCover.coverFileId || cleanText(matchingCloudSong?.coverFileId),
        createdAt: matchingCloudSong?.createdAt || song.createdAt,
        coverAssetId: ""
      });

      const savedSong = await saveSongToCloud(persistedSong);
      currentCloudSongsByKey.set(buildSongCatalogKey(savedSong), savedSong);
    }

    state.catalog = buildSeedBackedCatalog([
      ...migrationSourceCatalog,
      ...currentCloudSongsByKey.values()
    ]);
    state.syncMode = "cloud";
    saveCatalogSnapshot();
    saveLocalCatalogBackupSnapshot(state.catalog);
    renderAll();
    setFlash(`Migracao concluida: ${migrationSourceCatalog.length} musicas enviadas para a nuvem.`, "success");
  } catch (error) {
    console.error("Falha ao migrar o catalogo local para a nuvem.", error);
    setFlash("Nao consegui migrar tudo para a nuvem. Confira a URL do Apps Script, a chave admin e as permissoes da planilha.", "error");
  } finally {
    state.isMigratingCatalog = false;
    renderAdminModalHead();
  }
}

async function restoreSeedCatalog() {
  if (isCloudModeActive() && !state.adminLoggedIn) {
    setFlash("Entre como administrador antes de restaurar o acervo na nuvem.", "error");
    return;
  }

  const seedCatalog = buildSeedCatalog();

  if (!seedCatalog.length) {
    setFlash("Nao encontrei um acervo-base para restaurar.", "error");
    return;
  }

  const currentCatalog = [...state.catalog];
  const existingSongsByKey = new Map();

  for (const song of currentCatalog) {
    const key = buildSongCatalogKey(song);

    if (key && !existingSongsByKey.has(key)) {
      existingSongsByKey.set(key, song);
    }
  }

  const nextCatalog = seedCatalog.map((seedSong) => {
    const matchedSong = existingSongsByKey.get(buildSongCatalogKey(seedSong));

    if (!matchedSong) {
      return seedSong;
    }

    return createSongRecord({
      ...seedSong,
      id: matchedSong.id || seedSong.id,
      lyrics: matchedSong.lyrics,
      notes: matchedSong.notes,
      coverUrl: matchedSong.coverUrl,
      coverFileId: matchedSong.coverFileId,
      coverAssetId: matchedSong.coverAssetId,
      youtubeUrl: matchedSong.youtubeUrl,
      createdAt: matchedSong.createdAt || seedSong.createdAt,
      updatedAt: matchedSong.updatedAt || seedSong.updatedAt
    });
  });

  const nextCatalogIds = new Set(nextCatalog.map((song) => cleanText(song.id)).filter(Boolean));
  const songsToDelete = currentCatalog.filter((song) => !nextCatalogIds.has(cleanText(song.id)));
  const hasExactSeedCatalog = currentCatalog.length === nextCatalog.length
    && songsToDelete.length === 0
    && nextCatalog.every((song) => currentCatalog.some((currentSong) => cleanText(currentSong.id) === cleanText(song.id)));

  if (hasExactSeedCatalog) {
    setFlash("O acervo-base ja esta completo com 477 musicas no Elite e 177 no Alagoa.", "success");
    return;
  }

  const shouldRestore = window.confirm("Vou restaurar o acervo-base completo para voltar a 477 musicas no Elite e 177 no Alagoa. Deseja continuar?");

  if (!shouldRestore) {
    return;
  }

  state.isRestoringSeedCatalog = true;
  renderAdminModalHead();
  setFlash("Restaurando as musicas-base do acervo...", "success");

  try {
    setDeletedCatalogKeys([]);

    if (isCloudModeActive()) {
      for (const song of songsToDelete) {
        await deleteSongFromCloud(song.id);
      }

      for (const song of nextCatalog) {
        await saveSongToCloud(song);
      }

      state.catalog = await fetchCloudCatalog();
      state.syncMode = "cloud";
    } else {
      state.catalog = nextCatalog
        .map((song) => createSongRecord(song))
        .sort((leftSong, rightSong) => compareText(leftSong.artist, rightSong.artist) || compareText(leftSong.title, rightSong.title));
    }

    const validSongIds = new Set(state.catalog.map((song) => cleanText(song.id)).filter(Boolean));
    state.favorites = new Set([...state.favorites].filter((songId) => validSongIds.has(cleanText(songId))));
    state.selectedSongId = validSongIds.has(cleanText(state.selectedSongId)) ? state.selectedSongId : null;

    saveCatalogSnapshot();
    saveLocalCatalogBackupSnapshot(state.catalog);
    savePreferences();
    renderAll();
    setFlash("Acervo restaurado com sucesso: 477 musicas no Elite e 177 no Alagoa.", "success");
  } catch (error) {
    console.error("Falha ao restaurar o acervo-base.", error);
    setFlash("Nao consegui restaurar o acervo-base agora.", "error");
  } finally {
    state.isRestoringSeedCatalog = false;
    renderAdminModalHead();
  }
}

async function clearAllSongCovers() {
  if (isCloudModeActive() && !state.adminLoggedIn) {
    setFlash("Entre como administrador antes de limpar as capas na nuvem.", "error");
    return;
  }

  const migrationSourceCatalog = getMigrationSourceCatalog();
  const hasCurrentCovers = state.catalog.some((song) => songHasCover(song));
  const hasBackupCovers = migrationSourceCatalog.some((song) => songHasCover(song));

  if (!hasCurrentCovers && !hasBackupCovers) {
    setFlash("Nao encontrei capas para limpar agora.", "error");
    return;
  }

  const shouldClear = window.confirm("Isso vai remover todas as capas do acervo e manter apenas musicas, links e letras. Deseja continuar?");

  if (!shouldClear) {
    return;
  }

  state.isClearingAllCovers = true;
  renderAdminModalHead();
  setFlash("Limpando todas as capas do acervo...", "success");

  try {
    const currentCatalog = [...state.catalog];
    const nextLocalBackup = migrationSourceCatalog.map((song) => createSongRecord({
      ...song,
      coverUrl: "",
      coverFileId: "",
      coverAssetId: ""
    }));
    const coverAssetIds = new Set([
      ...currentCatalog.map((song) => cleanText(song.coverAssetId)),
      ...migrationSourceCatalog.map((song) => cleanText(song.coverAssetId))
    ].filter(Boolean));

    for (const coverAssetId of coverAssetIds) {
      await deleteCoverAsset(coverAssetId);
    }

    if (isCloudModeActive()) {
      const rawCloudCatalog = await fetchCloudCatalog({
        seedBacked: false,
        dedupe: false,
        includeDeleted: true
      });
      const processedKeys = new Set();

      for (const song of rawCloudCatalog) {
        const groupKey = buildSongCatalogKey(song) || `id:${cleanText(song.id)}`;

        if (!groupKey || processedKeys.has(groupKey)) {
          continue;
        }

        processedKeys.add(groupKey);
        const variants = getCloudSongVariantGroup(rawCloudCatalog, song);

        if (!variants.some((variant) => songHasCover(variant))) {
          continue;
        }

        const preferredSong = variants.reduce((bestSong, currentSong) => pickPreferredSongRecord(bestSong, currentSong));
        await saveSongToCloud(createSongRecord({
          ...preferredSong,
          coverUrl: "",
          coverFileId: "",
          coverAssetId: ""
        }));
        await deleteCloudSongVariants(preferredSong, variants, preferredSong.id);
      }

      state.catalog = await fetchCloudCatalog();
      state.syncMode = "cloud";
    } else {
      state.catalog = currentCatalog.map((song) => createSongRecord({
        ...song,
        coverUrl: "",
        coverFileId: "",
        coverAssetId: ""
      }));
    }

    resetAdminCoverDraft("");
    saveCatalogSnapshot();
    saveLocalCatalogBackupSnapshot(nextLocalBackup);
    renderAll();
    setFlash("Todas as capas foram removidas do acervo.", "success");
  } catch (error) {
    console.error("Falha ao limpar todas as capas.", error);
    setFlash("Nao consegui limpar todas as capas agora.", "error");
  } finally {
    state.isClearingAllCovers = false;
    renderAdminModalHead();
  }
}

async function resetCloudCatalogFromScratch() {
  if (!isCloudModeActive() || !state.adminLoggedIn) {
    setFlash("Entre como administrador antes de zerar a nuvem.", "error");
    return;
  }

  const shouldReset = window.confirm("Isso vai apagar todas as linhas da planilha remota, remover as capas ligadas a elas e limpar o historico local para recomecar do zero. Deseja continuar?");

  if (!shouldReset) {
    return;
  }

  state.isResettingCloudCatalog = true;
  renderAdminModalHead();
  setFlash("Zerando a planilha remota e limpando as capas...", "success");

  try {
    const rawCloudCatalog = await fetchCloudCatalog({
      seedBacked: false,
      dedupe: false,
      includeDeleted: true
    });
    const deleteCounts = new Map();

    for (const song of rawCloudCatalog) {
      const songId = cleanText(song.id);

      if (!songId) {
        continue;
      }

      deleteCounts.set(songId, (deleteCounts.get(songId) || 0) + 1);
    }

    for (const [songId, count] of deleteCounts.entries()) {
      for (let index = 0; index < count; index += 1) {
        await deleteSongFromCloud(songId);
      }
    }

    const localCoverAssetIds = new Set([
      ...state.catalog.map((song) => cleanText(song.coverAssetId)),
      ...getMigrationSourceCatalog().map((song) => cleanText(song.coverAssetId)),
      ...state.coverAssets.keys()
    ].filter(Boolean));

    await clearLocalCoverAssets([...localCoverAssetIds]);
    setDeletedCatalogKeys([]);

    state.catalog = buildSeedCatalog();
    state.selectedSongId = null;
    state.editingSongId = null;
    state.syncMode = "cloud";
    resetAdminCoverDraft();

    saveCatalogSnapshot();
    saveLocalCatalogBackupSnapshot(state.catalog);
    savePreferences();
    renderAll();
    setFlash("Planilha remota zerada com sucesso. Agora voce pode subir tudo do zero.", "success");
  } catch (error) {
    console.error("Falha ao resetar a planilha remota.", error);
    setFlash("Nao consegui zerar a planilha remota agora.", "error");
  } finally {
    state.isResettingCloudCatalog = false;
    renderAdminModalHead();
  }
}

function resetAdminCoverDraft(url = "") {
  state.adminCoverDraftUrl = cleanText(url);
  state.adminCoverDraftChanged = false;
}

function setAdminCoverDraft(url = "") {
  state.adminCoverDraftUrl = cleanText(url);
  state.adminCoverDraftChanged = true;
}

function getAdminCoverPreviewUrl() {
  if (state.adminCoverDraftChanged) {
    return state.adminCoverDraftUrl;
  }

  const editingSong = state.catalog.find((song) => song.id === state.editingSongId) || null;
  return resolveSongCoverUrl(editingSong);
}

function updateAdminCoverPreview() {
  const preview = elements.adminModal.querySelector("#song-cover-preview");
  if (!preview) {
    return;
  }

  const titleInput = elements.adminModal.querySelector("#song-title");
  const artistInput = elements.adminModal.querySelector("#song-artist");
  const coverHint = elements.adminModal.querySelector("#song-cover-hint");
  const removeCoverButton = elements.adminModal.querySelector("[data-remove-cover]");
  const coverUrl = getAdminCoverPreviewUrl();

  preview.innerHTML = renderArtworkMarkup({
    title: titleInput?.value || "Nova musica",
    artist: artistInput?.value || "Ministerio",
    coverUrl
  }, "admin");

  if (coverHint) {
    coverHint.textContent = coverUrl
      ? "Capa pronta. Se quiser trocar, escolha outra imagem."
      : "Envie uma imagem do celular ou computador.";
  }

  if (removeCoverButton instanceof HTMLButtonElement) {
    removeCoverButton.disabled = !coverUrl;
  }
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
        return;
      }

      reject(new Error("Nao consegui ler a imagem."));
    };
    reader.onerror = () => reject(new Error("Nao consegui ler a imagem."));
    reader.readAsDataURL(file);
  });
}

function loadImageElement(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Nao consegui abrir a imagem."));
    image.src = src;
  });
}

async function optimizeCoverUpload(file) {
  const rawDataUrl = await readFileAsDataUrl(file);

  if (!file.type.startsWith("image/")) {
    throw new Error("Selecione um arquivo de imagem valido.");
  }

  const image = await loadImageElement(rawDataUrl);
  const maxDimension = 1400;
  const width = image.naturalWidth || image.width;
  const height = image.naturalHeight || image.height;
  const longestSide = Math.max(width, height) || maxDimension;
  const scale = Math.min(1, maxDimension / longestSide);
  const nextWidth = Math.max(1, Math.round(width * scale));
  const nextHeight = Math.max(1, Math.round(height * scale));
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (!context) {
    return rawDataUrl;
  }

  canvas.width = nextWidth;
  canvas.height = nextHeight;
  context.drawImage(image, 0, 0, nextWidth, nextHeight);

  return canvas.toDataURL("image/jpeg", 0.88);
}

async function handleAdminCoverFileChange(file) {
  const coverFileInput = elements.adminModal.querySelector("#song-cover-file");

  if (!file) {
    return;
  }

  try {
    const optimizedCoverUrl = await optimizeCoverUpload(file);
    setAdminCoverDraft(optimizedCoverUrl);
    updateAdminCoverPreview();
    setFlash("Capa carregada com sucesso.", "success");
  } catch (error) {
    console.error(error);
    setFlash("Nao consegui carregar essa capa. Tente outra imagem.", "error");
  } finally {
    if (coverFileInput instanceof HTMLInputElement) {
      coverFileInput.value = "";
    }
  }
}

async function applyBatchCoverToSong(song, optimizedCoverUrl) {
  if (isCloudModeActive()) {
    const uploadedCover = await uploadCoverToCloud(song.id, song.producer, optimizedCoverUrl);
    return saveSongToCloud(createSongRecord({
      ...song,
      coverUrl: uploadedCover.coverUrl,
      coverFileId: uploadedCover.coverFileId,
      coverAssetId: "",
      updatedAt: new Date().toISOString()
    }));
  }

  const assetId = cleanText(song.coverAssetId) || cleanText(song.id) || buildId();
  const assetSaved = await saveCoverAsset(assetId, optimizedCoverUrl);

  return createSongRecord({
    ...song,
    coverUrl: assetSaved ? "" : optimizedCoverUrl,
    coverAssetId: assetSaved ? assetId : "",
    updatedAt: new Date().toISOString()
  });
}

async function handleBatchCoverFiles(fileList) {
  if (!isAdminAssetsMode()) {
    setFlash("Abra primeiro a tela de Capas e links para usar o lote.", "error");
    return;
  }

  if (isCloudModeActive() && !state.adminLoggedIn) {
    setFlash("Entre como administrador antes de importar capas em lote.", "error");
    return;
  }

  const batchInput = elements.coverBatchInput;
  const files = Array.from(fileList || []).filter((file) => file?.type?.startsWith("image/"));

  if (!files.length) {
    return;
  }

  const producer = getAdminProducerFilter();
  const lookup = buildBatchCoverLookup(producer);
  let appliedCount = 0;
  let skippedCount = 0;

  state.isBatchUploadingCovers = true;
  renderAdminModalHead();
  setFlash(`Importando ${files.length} capas em lote...`, "success");

  try {
    for (const file of files) {
      const song = findSongForBatchCover(file.name, lookup);

      if (!song) {
        skippedCount += 1;
        continue;
      }

      const optimizedCoverUrl = await optimizeCoverUpload(file);
      const persistedSong = await applyBatchCoverToSong(song, optimizedCoverUrl);
      state.catalog = state.catalog.map((item) => (item.id === persistedSong.id ? persistedSong : item));
      appliedCount += 1;
    }

    if (isCloudModeActive()) {
      state.catalog = await fetchCloudCatalog();
      state.syncMode = "cloud";
    }

    saveCatalogSnapshot();
    saveLocalCatalogBackupSnapshot(state.catalog);
    renderAll();

    if (appliedCount) {
      setFlash(`Lote concluido: ${appliedCount} capas aplicadas.${skippedCount ? ` ${skippedCount} arquivos nao bateram com nenhuma musica.` : ""}`, "success");
    } else {
      setFlash("Nenhum arquivo bateu com as musicas deste acervo. Use o nome do arquivo como artista - titulo ou so o titulo quando ele for unico.", "error");
    }
  } catch (error) {
    console.error("Falha ao importar capas em lote.", error);
    setFlash("Nao consegui importar esse lote de capas agora.", "error");
  } finally {
    state.isBatchUploadingCovers = false;
    renderAdminModalHead();

    if (batchInput instanceof HTMLInputElement) {
      batchInput.value = "";
    }
  }
}

function formatProducerName(producer) {
  return PRODUCERS[producer]?.name || "Multitracks";
}

function formatDate(value) {
  if (!value) {
    return "Sem data";
  }

  try {
    return new Intl.DateTimeFormat("pt-BR", {
      dateStyle: "short",
      timeStyle: "short"
    }).format(new Date(value));
  } catch (error) {
    return value;
  }
}

function getWeekStartDate(date = new Date()) {
  const current = new Date(date);
  current.setHours(0, 0, 0, 0);

  const day = current.getDay();
  const diffToMonday = day === 0 ? -6 : 1 - day;
  current.setDate(current.getDate() + diffToMonday);

  return current;
}

function getCurrentWeekKey(date = new Date()) {
  const weekStart = getWeekStartDate(date);
  const year = weekStart.getFullYear();
  const month = String(weekStart.getMonth() + 1).padStart(2, "0");
  const day = String(weekStart.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatWeekRangeLabel(startDate) {
  const start = new Date(startDate);
  start.setHours(0, 0, 0, 0);

  const end = new Date(start);
  end.setDate(end.getDate() + 6);

  const startMonth = start.toLocaleDateString("pt-BR", {
    month: "short"
  }).replace(".", "");
  const endMonth = end.toLocaleDateString("pt-BR", {
    month: "short"
  }).replace(".", "");

  if (startMonth === endMonth) {
    return `${start.getDate()} - ${end.getDate()} ${endMonth}`;
  }

  return `${start.getDate()} ${startMonth} - ${end.getDate()} ${endMonth}`;
}

function getWeeklySelectorInfo(date = new Date()) {
  const weekStart = getWeekStartDate(date);
  const rotationNames = sanitizeRotationNames(state.rotationNames);
  const manualRotationOffset = Number(state.manualRotationOffset) || 0;
  const [anchorYear, anchorMonth, anchorDay] = normalizeRotationAnchorValue(state.rotationAnchor)
    .split("-")
    .map((value) => Number(value));
  const anchorDate = new Date(anchorYear, anchorMonth - 1, anchorDay);
  anchorDate.setHours(0, 0, 0, 0);

  const millisecondsPerWeek = 1000 * 60 * 60 * 24 * 7;
  const weekOffset = Math.floor((weekStart.getTime() - anchorDate.getTime()) / millisecondsPerWeek);
  const normalizedIndex =
    (((weekOffset + manualRotationOffset) % rotationNames.length) + rotationNames.length) %
    rotationNames.length;

  return {
    name: rotationNames[normalizedIndex],
    weekLabel: formatWeekRangeLabel(weekStart)
  };
}

function getAccessGreetingByTime(date = new Date()) {
  const hours = new Date(date).getHours();

  if (hours < 12) {
    return "Bom dia";
  }

  if (hours < 18) {
    return "Boa tarde";
  }

  return "Boa noite";
}

function compareText(a, b) {
  return cleanText(a).localeCompare(cleanText(b), "pt-BR", {
    sensitivity: "base"
  });
}

function buildId() {
  return `song-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
}

function splitSongLabel(label) {
  const cleaned = cleanText(label);
  const match = cleaned.match(/^(.*?)\s*-\s*(.+)$/);

  if (!match) {
    return {
      artist: "Ministerio",
      title: cleaned
    };
  }

  return {
    artist: cleanText(match[1]),
    title: cleanText(match[2])
  };
}

function buildSongCatalogKey(input) {
  if (!input) {
    return "";
  }

  const producer = cleanText(input.producer) === "alagoa" ? "alagoa" : "elite";
  const artist = cleanText(input.artist);
  const title = cleanText(input.title);

  return normalizeBatchCoverKey(`${producer}-${artist}-${title}`);
}

function parseYouTubeInput(input) {
  const cleaned = cleanText(input);

  if (!cleaned) {
    return {
      raw: "",
      canonicalUrl: "",
      embedUrl: "",
      videoId: ""
    };
  }

  const patterns = [
    /youtu\.be\/([a-zA-Z0-9_-]{11})/,
    /[?&]v=([a-zA-Z0-9_-]{11})/,
    /\/embed\/([a-zA-Z0-9_-]{11})/,
    /\/shorts\/([a-zA-Z0-9_-]{11})/
  ];

  const matchedPattern = patterns.find((pattern) => pattern.test(cleaned));
  const videoId = matchedPattern ? cleaned.match(matchedPattern)?.[1] || "" : "";

  if (!videoId) {
    return {
      raw: cleaned,
      canonicalUrl: "",
      embedUrl: "",
      videoId: ""
    };
  }

  return {
    raw: cleaned,
    canonicalUrl: `https://www.youtube.com/watch?v=${videoId}`,
    embedUrl: `https://www.youtube.com/embed/${videoId}`,
    videoId
  };
}

function buildSearchUrl(song) {
  const query = encodeURIComponent(`${song.artist} ${song.title}`.trim());
  return `https://www.youtube.com/results?search_query=${query}`;
}

function simpleHash(input) {
  let hash = 5381;

  for (const character of cleanText(input)) {
    hash = (hash * 33) ^ character.charCodeAt(0);
  }

  return (hash >>> 0).toString(36);
}

function readJson(key, fallbackValue) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallbackValue;
  } catch (error) {
    console.error(`Falha ao ler ${key}`, error);
    return fallbackValue;
  }
}

function writeJson(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Falha ao salvar ${key}`, error);
    return false;
  }
}

function getDefaultRotationAnchorValue() {
  return `${WEEKLY_SELECTOR_ANCHOR.year}-${String(WEEKLY_SELECTOR_ANCHOR.month).padStart(2, "0")}-${String(WEEKLY_SELECTOR_ANCHOR.day).padStart(2, "0")}`;
}

function sanitizeRotationNames(input) {
  const source = Array.isArray(input)
    ? input
    : String(input || "").split(/\r?\n|,/);
  const uniqueNames = [];
  const seenNames = new Set();

  for (const value of source) {
    const normalizedName = cleanText(value);
    const searchKey = normalizeSearch(normalizedName);

    if (!normalizedName || seenNames.has(searchKey)) {
      continue;
    }

    seenNames.add(searchKey);
    uniqueNames.push(normalizedName);
  }

  return uniqueNames.length ? uniqueNames : [...WEEKLY_SELECTOR_ROTATION];
}

function normalizeRotationAnchorValue(value) {
  const normalizedValue = cleanText(value);

  if (/^\d{4}-\d{2}-\d{2}$/.test(normalizedValue)) {
    return normalizedValue;
  }

  return getDefaultRotationAnchorValue();
}

function sanitizeMemberRecords(input) {
  if (!Array.isArray(input)) {
    return [];
  }

  const records = [];
  const seen = new Set();

  for (const entry of input) {
    const username = cleanText(entry?.username);
    const passwordHash = cleanText(entry?.passwordHash);
    const usernameKey = normalizeSearch(username);

    if (!username || !passwordHash || !usernameKey || seen.has(usernameKey)) {
      continue;
    }

    seen.add(usernameKey);
    records.push({
      username,
      passwordHash
    });
  }

  return records;
}

function readAppMetaCache() {
  const cachedMeta = readJson(STORAGE_KEYS.appMeta, {});
  const memberRecords = sanitizeMemberRecords(cachedMeta.memberRecords);
  const memberAccounts = Array.isArray(cachedMeta.memberAccounts)
    ? cachedMeta.memberAccounts.map((member) => cleanText(member)).filter(Boolean)
    : memberRecords.map((member) => member.username);

  return {
    rotationNames: sanitizeRotationNames(cachedMeta.rotationNames),
    rotationAnchor: normalizeRotationAnchorValue(cachedMeta.rotationAnchor),
    memberLoginRequired: Boolean(cachedMeta.memberLoginRequired),
    memberAccounts,
    memberRecords,
    favorites: sanitizeSongIdList(cachedMeta.favorites),
    manualRotationOffset: normalizeManualRotationOffset(cachedMeta.manualRotationOffset),
    weeklySelectionWeekKey: cleanText(cachedMeta.weeklySelectionWeekKey) || getCurrentWeekKey(),
    weeklySelectedSongIds: sanitizeSongIdList(cachedMeta.weeklySelectedSongIds),
    weeklySelectionOwners: sanitizeWeeklySelectionOwners(cachedMeta.weeklySelectionOwners)
  };
}

function writeAppMetaCache(meta = {}) {
  const cachedMeta = readJson(STORAGE_KEYS.appMeta, {});
  const memberRecords = sanitizeMemberRecords(meta.memberRecords);
  const memberAccounts = Array.isArray(meta.memberAccounts)
    ? meta.memberAccounts.map((member) => cleanText(member)).filter(Boolean)
    : hasOwn(meta, "memberRecords")
      ? memberRecords.map((member) => member.username)
      : Array.isArray(cachedMeta.memberAccounts)
        ? cachedMeta.memberAccounts.map((member) => cleanText(member)).filter(Boolean)
        : sanitizeMemberRecords(cachedMeta.memberRecords).map((member) => member.username);

  return writeJson(STORAGE_KEYS.appMeta, {
    rotationNames: hasOwn(meta, "rotationNames")
      ? sanitizeRotationNames(meta.rotationNames)
      : sanitizeRotationNames(cachedMeta.rotationNames),
    rotationAnchor: hasOwn(meta, "rotationAnchor")
      ? normalizeRotationAnchorValue(meta.rotationAnchor)
      : normalizeRotationAnchorValue(cachedMeta.rotationAnchor),
    memberLoginRequired: hasOwn(meta, "memberLoginRequired")
      ? Boolean(meta.memberLoginRequired)
      : Boolean(cachedMeta.memberLoginRequired),
    memberAccounts,
    memberRecords: hasOwn(meta, "memberRecords")
      ? memberRecords
      : sanitizeMemberRecords(cachedMeta.memberRecords),
    favorites: hasOwn(meta, "favorites")
      ? sanitizeSongIdList(meta.favorites)
      : sanitizeSongIdList(cachedMeta.favorites),
    manualRotationOffset: hasOwn(meta, "manualRotationOffset")
      ? normalizeManualRotationOffset(meta.manualRotationOffset)
      : normalizeManualRotationOffset(cachedMeta.manualRotationOffset),
    weeklySelectionWeekKey: hasOwn(meta, "weeklySelectionWeekKey")
      ? (cleanText(meta.weeklySelectionWeekKey) || getCurrentWeekKey())
      : (cleanText(cachedMeta.weeklySelectionWeekKey) || getCurrentWeekKey()),
    weeklySelectedSongIds: hasOwn(meta, "weeklySelectedSongIds")
      ? sanitizeSongIdList(meta.weeklySelectedSongIds)
      : sanitizeSongIdList(cachedMeta.weeklySelectedSongIds),
    weeklySelectionOwners: hasOwn(meta, "weeklySelectionOwners")
      ? sanitizeWeeklySelectionOwners(meta.weeklySelectionOwners)
      : sanitizeWeeklySelectionOwners(cachedMeta.weeklySelectionOwners)
  });
}

function readMemberSession() {
  try {
    return cleanText(localStorage.getItem(STORAGE_KEYS.memberSession));
  } catch (error) {
    console.error("Falha ao ler sessao do membro.", error);
    return "";
  }
}

function writeMemberSession(username = "") {
  const normalizedUsername = cleanText(username);

  try {
    if (normalizedUsername) {
      localStorage.setItem(STORAGE_KEYS.memberSession, normalizedUsername);
      return;
    }

    localStorage.removeItem(STORAGE_KEYS.memberSession);
  } catch (error) {
    console.error("Falha ao salvar sessao do membro.", error);
  }
}

function readAccessSession() {
  const session = readJson(STORAGE_KEYS.accessSession, null);

  if (!session || !cleanText(session.role)) {
    return {
      role: "guest",
      username: "",
      authHash: ""
    };
  }

  return {
    role: cleanText(session.role),
    username: cleanText(session.username),
    authHash: cleanText(session.authHash)
  };
}

function writeAccessSession(role = "", username = "", authHash = "") {
  const normalizedRole = cleanText(role);
  const normalizedUsername = cleanText(username);
  const normalizedAuthHash = cleanText(authHash);

  if (!normalizedRole || !normalizedUsername) {
    writeJson(STORAGE_KEYS.accessSession, null);
    return;
  }

  writeJson(STORAGE_KEYS.accessSession, {
    role: normalizedRole,
    username: normalizedUsername,
    authHash: normalizedAuthHash
  });
}

function readRememberedAccess() {
  const stored = readJson(STORAGE_KEYS.rememberedAccess, null);

  if (!stored) {
    return null;
  }

  const username = cleanText(stored.username);
  const password = cleanText(stored.password);

  if (!username || !password) {
    return null;
  }

  return {
    username,
    password
  };
}

function writeRememberedAccess(username = "", password = "") {
  const normalizedUsername = cleanText(username);
  const normalizedPassword = cleanText(password);

  if (!normalizedUsername || !normalizedPassword) {
    writeJson(STORAGE_KEYS.rememberedAccess, null);
    state.rememberedAccess = null;
    return;
  }

  const payload = {
    username: normalizedUsername,
    password: normalizedPassword
  };

  writeJson(STORAGE_KEYS.rememberedAccess, payload);
  state.rememberedAccess = payload;
}

function isAdminUser() {
  return state.adminLoggedIn;
}

function isMemberUser() {
  return !state.adminLoggedIn && state.memberLoggedIn;
}

function hasAccessSession() {
  return isAdminUser() || isMemberUser();
}

function requiresAppLogin() {
  return isGoogleSheetsConfigured() || hasAdminConfig() || state.memberAccounts.length > 0 || state.memberRecords.length > 0;
}

function mergeMemberAccountsWithLocalRecords(memberAccounts = []) {
  const usernames = Array.isArray(memberAccounts)
    ? memberAccounts.map((member) => cleanText(member)).filter(Boolean)
    : [];
  const nextRecords = [...state.memberRecords];
  const seenUsernames = new Set(nextRecords.map((record) => normalizeSearch(record.username)).filter(Boolean));
  const mergedAccounts = [...usernames];

  for (const record of state.memberRecords) {
    const recordKey = normalizeSearch(record.username);
    if (!recordKey || seenUsernames.has(recordKey)) {
      continue;
    }

    seenUsernames.add(recordKey);
    nextRecords.push(record);
  }

  for (const record of nextRecords) {
    const recordKey = normalizeSearch(record.username);
    const alreadyListed = mergedAccounts.some((username) => normalizeSearch(username) === recordKey);

    if (!alreadyListed) {
      mergedAccounts.push(record.username);
    }
  }

  return {
    memberAccounts: mergedAccounts,
    memberRecords: nextRecords
  };
}

function saveMemberLocally(username, password) {
  const normalizedUsername = cleanText(username);
  const passwordHash = simpleHash(password);
  const nextRecords = state.memberRecords
    .filter((record) => normalizeSearch(record.username) !== normalizeSearch(normalizedUsername));

  nextRecords.push({
    username: normalizedUsername,
    passwordHash
  });

  const nextMeta = {
    rotationNames: state.rotationNames,
    rotationAnchor: state.rotationAnchor,
    memberLoginRequired: nextRecords.length > 0,
    memberAccounts: nextRecords.map((record) => record.username),
    memberRecords: nextRecords
  };

  writeAppMetaCache(nextMeta);
  applyAppMeta(nextMeta);
}

function deleteMemberLocally(username) {
  const normalizedUsername = cleanText(username);
  const nextRecords = state.memberRecords.filter((record) => normalizeSearch(record.username) !== normalizeSearch(normalizedUsername));
  const nextAccounts = state.memberAccounts.filter((member) => normalizeSearch(member) !== normalizeSearch(normalizedUsername));
  const nextMeta = {
    rotationNames: state.rotationNames,
    rotationAnchor: state.rotationAnchor,
    memberLoginRequired: nextRecords.length > 0 || nextAccounts.length > 0,
    memberAccounts: nextAccounts,
    memberRecords: nextRecords
  };

  writeAppMetaCache(nextMeta);
  applyAppMeta(nextMeta);
}

function signInMemberLocal(username, password) {
  const normalizedUsername = cleanText(username);
  const passwordHash = simpleHash(password);
  const matchingMember = state.memberRecords.find((record) => {
    return normalizeSearch(record.username) === normalizeSearch(normalizedUsername)
      && record.passwordHash === passwordHash;
  });

  if (!matchingMember) {
    throw new Error("Usuario ou senha do membro incorretos.");
  }

  state.currentMemberUsername = matchingMember.username;
  state.currentAccessHash = passwordHash;
  state.currentAccessRole = "member";
  state.cloudAdminKey = "";
  state.adminLoggedIn = false;
  state.memberLoggedIn = true;
  writeCloudAdminKey("");
  writeAccessSession("member", matchingMember.username, passwordHash);
  writeMemberSession(matchingMember.username);
}

function getAdminConfig() {
  const config = readJson(STORAGE_KEYS.adminConfig, null);

  if (!config || !cleanText(config.username) || !cleanText(config.passwordHash)) {
    return null;
  }

  return config;
}

function hasAdminConfig() {
  return Boolean(getAdminConfig());
}

function setAdminSession(isLoggedIn) {
  state.adminLoggedIn = Boolean(isLoggedIn) && hasAdminConfig();

  if (state.adminLoggedIn) {
    sessionStorage.setItem(STORAGE_KEYS.adminSession, "true");
    return;
  }

  sessionStorage.removeItem(STORAGE_KEYS.adminSession);
}

function applyAppMeta(meta = {}) {
  if (hasOwn(meta, "rotationNames")) {
    state.rotationNames = sanitizeRotationNames(meta.rotationNames);
  }

  if (hasOwn(meta, "rotationAnchor")) {
    state.rotationAnchor = normalizeRotationAnchorValue(meta.rotationAnchor);
  }

  if (hasOwn(meta, "memberRecords")) {
    state.memberRecords = sanitizeMemberRecords(meta.memberRecords);
  }

  if (hasOwn(meta, "memberAccounts")) {
    state.memberAccounts = Array.isArray(meta.memberAccounts) && meta.memberAccounts.length
      ? meta.memberAccounts.map((member) => cleanText(member)).filter(Boolean)
      : state.memberRecords.map((member) => member.username);
  } else if (hasOwn(meta, "memberRecords")) {
    state.memberAccounts = state.memberRecords.map((member) => member.username);
  }

  if (hasOwn(meta, "memberLoginRequired")) {
    state.memberLoginRequired = Boolean(meta.memberLoginRequired) && (state.memberAccounts.length > 0 || state.memberRecords.length > 0);
  }

  if (hasOwn(meta, "favorites")) {
    state.favorites = new Set(sanitizeSongIdList(meta.favorites));
  }

  if (hasOwn(meta, "manualRotationOffset")) {
    state.manualRotationOffset = normalizeManualRotationOffset(meta.manualRotationOffset);
  }

  if (hasOwn(meta, "weeklySelectionWeekKey")) {
    state.weeklySelectionWeekKey = cleanText(meta.weeklySelectionWeekKey) || getCurrentWeekKey();
  }

  if (hasOwn(meta, "weeklySelectedSongIds")) {
    state.weeklySelectedSongIds = sanitizeSongIdList(meta.weeklySelectedSongIds);
  }

  if (hasOwn(meta, "weeklySelectionOwners")) {
    state.weeklySelectionOwners = sanitizeWeeklySelectionOwners(meta.weeklySelectionOwners);
  }

  const currentMemberUsername = cleanText(state.currentMemberUsername);
  const memberExists = state.memberAccounts.some((member) => normalizeSearch(member) === normalizeSearch(currentMemberUsername))
    || state.memberRecords.some((member) => normalizeSearch(member.username) === normalizeSearch(currentMemberUsername));

  if (!state.memberLoginRequired && state.currentAccessRole !== "admin") {
    state.currentMemberUsername = "";
    state.currentAccessHash = "";
    state.currentAccessRole = state.adminLoggedIn ? "admin" : "guest";
    state.memberLoggedIn = false;
    writeMemberSession("");
    return;
  }

  if (currentMemberUsername && memberExists) {
    if (state.currentAccessRole !== "admin") {
      state.currentAccessRole = "member";
      state.memberLoggedIn = true;
    }
    return;
  }

  if (state.currentAccessRole !== "admin") {
    state.currentMemberUsername = "";
    state.currentAccessHash = "";
    state.currentAccessRole = "guest";
    state.memberLoggedIn = false;
    writeMemberSession("");
    writeAccessSession("", "");
  }
}

function createSongRecord(input) {
  const parsedYouTube = parseYouTubeInput(input.youtubeUrl);
  const createdAt = input.createdAt || new Date().toISOString();

  return {
    id: cleanText(input.id) || buildId(),
    producer: input.producer === "alagoa" ? "alagoa" : "elite",
    artist: cleanText(input.artist) || "Ministerio",
    title: cleanText(input.title) || "Sem titulo",
    lyrics: cleanMultilineText(input.lyrics),
    notes: cleanText(input.notes),
    source: cleanText(input.source),
    coverUrl: cleanText(input.coverUrl),
    coverFileId: cleanText(input.coverFileId),
    coverAssetId: cleanText(input.coverAssetId),
    youtubeUrl: parsedYouTube.canonicalUrl,
    videoId: parsedYouTube.videoId,
    createdAt,
    updatedAt: input.updatedAt || createdAt
  };
}

function buildSeedCatalog() {
  if (!SEED_CATALOG_ENABLED) {
    return [];
  }

  const baseDate = Date.parse("2026-01-10T12:00:00Z");
  let offset = 0;

  return seedGroups
    .filter((group) => ENABLED_SEED_PRODUCERS.has(group.producer))
    .flatMap((group) => {
    return group.tracks.map((entry) => {
      const parts = splitSongLabel(entry);
      const createdAt = new Date(baseDate - offset * 60000).toISOString();
      offset += 1;

      return createSongRecord({
        id: `seed-${buildSongCatalogKey({
          producer: group.producer,
          artist: parts.artist,
          title: parts.title
        }) || buildId()}`,
        producer: group.producer,
        artist: parts.artist,
        title: parts.title,
        source: group.source,
        createdAt,
        updatedAt: createdAt,
        youtubeUrl: ""
      });
    });
    });
}

async function loadCatalog() {
  const fallbackCatalog = loadLocalCatalogSnapshot();
  const cachedMeta = readAppMetaCache();
  state.catalog = fallbackCatalog;
  saveLocalCatalogBackupSnapshot(fallbackCatalog);
  applyAppMeta(cachedMeta);

  if (!isGoogleSheetsConfigured()) {
    state.syncMode = "local";
    saveCatalogSnapshot();
    return;
  }

  if (!hasGoogleSheetsSupport()) {
    console.warn("Este navegador nao conseguiu usar a integracao com Google Sheets. Mantendo modo local.");
    state.syncMode = "local";
    saveCatalogSnapshot();
    return;
  }

  try {
    await refreshCloudAdminState();
    applyAppMeta(await fetchCloudAppMeta());
    const cloudCatalog = await fetchCloudCatalog();
    state.catalog = cloudCatalog.length ? cloudCatalog : fallbackCatalog;
    saveCatalogSnapshot();
    saveLocalCatalogBackupSnapshot(state.catalog);
  } catch (error) {
    console.error("Falha ao carregar catalogo remoto.", error);
    state.syncMode = "local";
    state.catalog = fallbackCatalog;
    applyAppMeta(cachedMeta);
  }
}

function saveCatalog() {
  saveCatalogSnapshot();

  saveLocalCatalogBackupSnapshot();
}

function loadPreferences() {
  const stored = readJson(STORAGE_KEYS.preferences, {});
  const hasHashProducer = location.hash === "#elite" || location.hash === "#alagoa";

  state.query = preserveInputText(stored.query);
  state.favoritesOnly = Boolean(stored.favoritesOnly);
  state.favorites = new Set(Array.isArray(stored.favorites) ? stored.favorites.map((item) => cleanText(item)).filter(Boolean) : []);
  state.activeProducer = hasHashProducer
    ? getInitialProducer()
      : stored.activeProducer === "alagoa"
      ? "alagoa"
      : "elite";
  state.manualRotationOffset = Number.isFinite(Number(stored.manualRotationOffset))
    ? Number(stored.manualRotationOffset)
    : 0;
  state.selectedSongId = null;
  state.weeklySelectionWeekKey = cleanText(stored.weeklySelectionWeekKey) || getCurrentWeekKey();
  state.weeklySelectedSongIds = sanitizeSongIdList(stored.weeklySelectedSongIds);
  state.weeklySelectionOwners = sanitizeWeeklySelectionOwners(stored.weeklySelectionOwners);
  ensureWeeklySelectionsCurrentWeek();
  syncWeeklySelectedSongs();
}

function savePreferences() {
  writeJson(STORAGE_KEYS.preferences, {
    query: state.query,
    favoritesOnly: state.favoritesOnly,
    favorites: [...state.favorites],
    activeProducer: state.activeProducer,
    manualRotationOffset: Number(state.manualRotationOffset) || 0,
    weeklySelectionWeekKey: cleanText(state.weeklySelectionWeekKey) || getCurrentWeekKey(),
    weeklySelectedSongIds: sanitizeSongIdList(state.weeklySelectedSongIds),
    weeklySelectionOwners: sanitizeWeeklySelectionOwners(state.weeklySelectionOwners)
  });
}

function loadAdminState() {
  const cachedMeta = readAppMetaCache();
  const accessSession = readAccessSession();
  state.deletedCatalogKeys = new Set(readDeletedCatalogKeys());
  state.cloudAdminKey = readCloudAdminKey();
  state.rememberedAccess = readRememberedAccess();
  state.syncMode = isGoogleSheetsConfigured() ? "cloud" : "local";
  state.currentMemberUsername = cleanText(accessSession.username) || readMemberSession();
  state.currentAccessHash = accessSession.role === "member" ? cleanText(accessSession.authHash) : "";
  state.currentAccessRole = accessSession.role === "admin" || accessSession.role === "member" ? accessSession.role : "guest";
  state.adminLoggedIn = state.currentAccessRole === "admin" && (!isGoogleSheetsConfigured() || Boolean(state.cloudAdminKey));
  state.memberLoggedIn = state.currentAccessRole === "member";
  applyAppMeta(cachedMeta);
}

function setAdminModalMode(mode = "create") {
  state.adminModalMode = ["assets", "users"].includes(mode) ? mode : "create";
}

function isAdminAssetsMode() {
  return state.adminModalMode === "assets";
}

function isAdminUsersMode() {
  return state.adminModalMode === "users";
}

function getAdminModalCopy() {
  if (isAdminUsersMode()) {
    return {
      eyebrow: "Usuarios",
      title: "Cadastrar usuario"
    };
  }

  if (isAdminAssetsMode()) {
    return {
      eyebrow: "Atualizacao",
      title: "Capas e links do acervo"
    };
  }

  return {
    eyebrow: "Cadastro",
    title: "Cadastrar musica"
  };
}

function getAdminProducerFilter() {
  return state.adminProducerFilter === "alagoa" ? "alagoa" : "elite";
}

function setAdminProducerFilter(producer) {
  state.adminProducerFilter = producer === "alagoa" ? "alagoa" : "elite";
}

function buildAdminModalActionsMarkup() {
  const migrationSourceCount = getMigrationSourceCatalog().length;
  const actions = [];

  if (isAdminUsersMode() || !isAdminAssetsMode()) {
    return "";
  }

  if (isAdminAssetsMode() && (!isCloudModeActive() || state.adminLoggedIn) && getSongsByProducer(getAdminProducerFilter()).length) {
    actions.push(`
      <button class="secondary-button" type="button" data-open-cover-batch="true" ${state.isBatchUploadingCovers ? "disabled" : ""}>
        ${state.isBatchUploadingCovers ? "Importando capas..." : "Capas em lote"}
      </button>
    `);
  }

  if (isCloudModeActive() && state.adminLoggedIn && migrationSourceCount) {
    actions.push(`
      <button class="secondary-button" type="button" data-migrate-local-catalog="true" ${state.isMigratingCatalog ? "disabled" : ""}>
        ${state.isMigratingCatalog ? "Migrando acervo..." : `Migrar ${migrationSourceCount} musicas para a nuvem`}
      </button>
    `);
  }

  if (!isCloudModeActive() || state.adminLoggedIn) {
    actions.push(`
      <button class="secondary-button" type="button" data-restore-seed-catalog="true" ${state.isRestoringSeedCatalog ? "disabled" : ""}>
        ${state.isRestoringSeedCatalog ? "Restaurando acervo..." : "Restaurar musicas-base"}
      </button>
    `);
  }

  if ((!isCloudModeActive() || state.adminLoggedIn) && hasAnyKnownCover()) {
    actions.push(`
      <button class="secondary-button" type="button" data-clear-all-covers="true" ${state.isClearingAllCovers ? "disabled" : ""}>
        ${state.isClearingAllCovers ? "Limpando capas..." : "Limpar todas as capas"}
      </button>
    `);
  }

  if (isCloudModeActive() && state.adminLoggedIn) {
    actions.push(`
      <button class="danger-button" type="button" data-reset-cloud-catalog="true" ${state.isResettingCloudCatalog ? "disabled" : ""}>
        ${state.isResettingCloudCatalog ? "Zerando nuvem..." : "Zerar nuvem do zero"}
      </button>
    `);
  }

  return actions.join("");
}

function renderAdminModalHead() {
  const modalCopy = getAdminModalCopy();

  if (elements.adminModalEyebrow) {
    elements.adminModalEyebrow.textContent = modalCopy.eyebrow;
  }

  if (elements.adminModalTitle) {
    elements.adminModalTitle.textContent = modalCopy.title;
  }

  if (elements.adminModalActions) {
    elements.adminModalActions.innerHTML = buildAdminModalActionsMarkup();
  }
}

function getSongsByProducer(producer) {
  return state.catalog.filter((song) => song.producer === producer);
}

function getProducerSummary(producer) {
  const songs = getSongsByProducer(producer);
  const readySongs = songs.filter((song) => song.videoId);

  return {
    total: songs.length,
    ready: readySongs.length,
    pending: songs.length - readySongs.length
  };
}

function getVisibleSongs() {
  const query = normalizeSearch(state.query);
  const songs = getSongsByProducer(state.activeProducer).filter((song) => {
    if (state.favoritesOnly && !state.favorites.has(song.id)) {
      return false;
    }

    if (!query) {
      return true;
    }

    const haystack = normalizeSearch(`${song.artist} ${song.title} ${song.lyrics} ${song.notes} ${song.source}`);
    return haystack.includes(query);
  });

  return [...songs].sort((left, right) => {
    return compareText(left.artist, right.artist) || compareText(left.title, right.title);
  });
}

function getSelectedSong() {
  return state.catalog.find((song) => song.id === state.selectedSongId) || null;
}

function isFavorite(songId) {
  return state.favorites.has(cleanText(songId));
}

function toggleFavorite(songId) {
  const normalizedSongId = cleanText(songId);

  if (!normalizedSongId) {
    return;
  }

  if (state.favorites.has(normalizedSongId)) {
    state.favorites.delete(normalizedSongId);
  } else {
    state.favorites.add(normalizedSongId);
  }

  writeAppMetaCache({
    favorites: [...state.favorites]
  });
  queueSharedStateSync({
    immediate: true,
    silent: true
  });
  renderAll();
}

function syncWeeklySelectedSongs() {
  const previousIds = sanitizeSongIdList(state.weeklySelectedSongIds);
  const previousOwners = sanitizeWeeklySelectionOwners(state.weeklySelectionOwners);
  const validSongIds = new Set(state.catalog.map((song) => cleanText(song.id)).filter(Boolean));
  const nextWeeklySelectedIds = sanitizeSongIdList(state.weeklySelectedSongIds)
    .filter((songId) => validSongIds.has(songId));
  const nextOwners = sanitizeWeeklySelectionOwners(state.weeklySelectionOwners);

  state.weeklySelectedSongIds = nextWeeklySelectedIds;
  state.weeklySelectionOwners = Object.fromEntries(
    Object.entries(nextOwners).filter(([songId]) => nextWeeklySelectedIds.includes(songId))
  );

  const hasSelectionChanged = JSON.stringify(previousIds) !== JSON.stringify(state.weeklySelectedSongIds)
    || JSON.stringify(previousOwners) !== JSON.stringify(state.weeklySelectionOwners);

  if (hasSelectionChanged) {
    writeAppMetaCache(buildSharedAppStatePayload());
    queueSharedStateSync({
      immediate: true,
      silent: true
    });
  }
}

function ensureWeeklySelectionsCurrentWeek() {
  const currentWeekKey = getCurrentWeekKey();

  if (!state.weeklySelectionWeekKey) {
    state.weeklySelectionWeekKey = currentWeekKey;
    return false;
  }

  if (state.weeklySelectionWeekKey === currentWeekKey) {
    return false;
  }

  state.weeklySelectionWeekKey = currentWeekKey;
  state.weeklySelectedSongIds = [];
  state.weeklySelectionOwners = {};
  writeAppMetaCache(buildSharedAppStatePayload());
  queueSharedStateSync({
    immediate: true,
    silent: true
  });
  return true;
}

function getWeeklySelectedSongs() {
  const songsById = new Map(state.catalog.map((song) => [cleanText(song.id), song]));

  return sanitizeSongIdList(state.weeklySelectedSongIds)
    .map((songId) => songsById.get(songId))
    .filter(Boolean);
}

function isWeeklySelected(songId) {
  const normalizedSongId = cleanText(songId);
  return state.weeklySelectedSongIds.includes(normalizedSongId);
}

function canManageWeeklySelection(songId) {
  if (isAdminUser()) {
    return true;
  }

  const normalizedSongId = cleanText(songId);
  const owner = cleanText(state.weeklySelectionOwners?.[normalizedSongId]);

  return Boolean(owner) && normalizeSearch(owner) === normalizeSearch(state.currentMemberUsername);
}

function removeSongFromWeeklySelections(songId) {
  const normalizedSongId = cleanText(songId);

  if (!normalizedSongId) {
    return;
  }

  if (!canManageWeeklySelection(normalizedSongId)) {
    setFlash("So quem adicionou essa musica da semana ou o admin pode remover.", "error");
    return;
  }

  state.weeklySelectedSongIds = state.weeklySelectedSongIds.filter((currentSongId) => currentSongId !== normalizedSongId);
  delete state.weeklySelectionOwners[normalizedSongId];
  writeAppMetaCache(buildSharedAppStatePayload());
  queueSharedStateSync({
    immediate: true,
    silent: false
  });
  renderAll();
  setFlash("Musica removida das selecionadas da semana.", "success");
}

function addSongToWeeklySelections(songId) {
  const normalizedSongId = cleanText(songId);
  const song = state.catalog.find((item) => item.id === normalizedSongId);

  if (!song) {
    setFlash("Nao encontrei a musica para selecionar.", "error");
    return;
  }

  if (!isWeeklySelected(normalizedSongId)) {
    state.weeklySelectedSongIds = [...state.weeklySelectedSongIds, normalizedSongId];
    state.weeklySelectionOwners[normalizedSongId] = cleanText(state.currentMemberUsername) || "admin";
  }

  state.lyricsMinistryMode = false;
  state.selectedSongId = null;
  writeAppMetaCache(buildSharedAppStatePayload());
  queueSharedStateSync({
    immediate: true,
    silent: false
  });
  renderAll();

  if (elements.weeklySelectionsPanel && !elements.weeklySelectionsPanel.hidden) {
    elements.weeklySelectionsPanel.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }

  setFlash(`"${song.title}" foi para Musicas selecionadas da semana.`, "success");
}

function ensureSelectedSong() {
  const visibleSongs = getVisibleSongs();
  const selectedIsVisible = visibleSongs.some((song) => song.id === state.selectedSongId);

  if (!visibleSongs.length) {
    state.selectedSongId = null;
    return;
  }

  if (state.selectedSongId && !selectedIsVisible) {
    state.selectedSongId = null;
  }
}

function syncHash() {
  const nextHash = `#${state.activeProducer}`;

  if (location.hash === nextHash) {
    return;
  }

  history.replaceState(null, "", nextHash);
}

function setFlash(message, type = "") {
  state.flashMessage = cleanText(message);
  state.flashType = cleanText(type);
  renderAdminFlash();

  if (flashTimerId) {
    clearTimeout(flashTimerId);
    flashTimerId = null;
  }

  if (!state.flashMessage) {
    return;
  }

  flashTimerId = window.setTimeout(() => {
    state.flashMessage = "";
    state.flashType = "";
    renderAdminFlash();
  }, 3200);
}

function renderAdminFlash() {
  const flashTargets = [elements.adminFlash, elements.memberLoginFlash].filter(Boolean);

  for (const target of flashTargets) {
    target.textContent = state.flashMessage;
    target.className = "admin-flash";

    if (state.flashType) {
      target.classList.add(`is-${state.flashType}`);
    }
  }
}

function renderAccessControls() {
  const adminButtonsVisible = state.currentAccessRole === "admin" && isAdminUser();
  const sessionVisible = hasAccessSession();

  if (elements.openAdminButton) {
    elements.openAdminButton.hidden = !adminButtonsVisible;
    elements.openAdminButton.style.display = adminButtonsVisible ? "" : "none";
  }

  if (elements.openAssetsButton) {
    elements.openAssetsButton.hidden = !adminButtonsVisible;
    elements.openAssetsButton.style.display = adminButtonsVisible ? "" : "none";
  }

  if (elements.openUsersButton) {
    elements.openUsersButton.hidden = !adminButtonsVisible;
    elements.openUsersButton.style.display = adminButtonsVisible ? "" : "none";
  }

  if (elements.memberLogoutButton) {
    elements.memberLogoutButton.hidden = !sessionVisible;

    if (sessionVisible) {
      const roleLabel = isAdminUser() ? "admin" : "membro";
      elements.memberLogoutButton.textContent = `Sair (${roleLabel}: ${state.currentMemberUsername || roleLabel})`;
    }
  }
}

function renderMemberLoginOverlay() {
  if (!elements.memberLoginOverlay) {
    return;
  }

  const shouldShowOverlay = requiresAppLogin() && !hasAccessSession();
  elements.memberLoginOverlay.classList.toggle("is-hidden", !shouldShowOverlay);
  elements.memberLoginOverlay.setAttribute("aria-hidden", shouldShowOverlay ? "false" : "true");

  if (shouldShowOverlay && elements.memberLoginForm) {
    const usernameInput = elements.memberLoginForm.querySelector('input[name="login-username"]');
    const passwordInput = elements.memberLoginForm.querySelector('input[name="login-password"]');
    const rememberedAccess = state.rememberedAccess;

    if (usernameInput && !cleanText(usernameInput.value) && rememberedAccess?.username) {
      usernameInput.value = rememberedAccess.username;
    }

    if (passwordInput && !cleanText(passwordInput.value) && rememberedAccess?.password) {
      passwordInput.value = rememberedAccess.password;
    }

    if (elements.rememberAccessLogin) {
      elements.rememberAccessLogin.checked = Boolean(rememberedAccess?.username && rememberedAccess?.password);
    }
  }

  if (!shouldShowOverlay && elements.memberLoginForm) {
    elements.memberLoginForm.reset();
  }
}

function renderHeroStats() {
  const eliteSummary = getProducerSummary("elite");
  const alagoaSummary = getProducerSummary("alagoa");
  const weeklySelector = getWeeklySelectorInfo();
  const weeklySelectorLeftControl = isAdminUser()
    ? `<button class="icon-button weekly-selector-arrow" type="button" data-shift-weekly-selector="-1" aria-label="Voltar escala">
         &lsaquo;
       </button>`
    : `<span class="weekly-selector-spacer" aria-hidden="true"></span>`;
  const weeklySelectorRightControl = isAdminUser()
    ? `<button class="icon-button weekly-selector-arrow" type="button" data-shift-weekly-selector="1" aria-label="Avancar escala">
         &rsaquo;
       </button>`
    : `<span class="weekly-selector-spacer" aria-hidden="true"></span>`;

  elements.heroStats.innerHTML = `
    <article class="stat-card">
      <span class="eyebrow">Elite</span>
      <strong>${eliteSummary.total}</strong>
      <span class="muted-copy">Musicas no acervo Elite</span>
    </article>
    <article class="stat-card">
      <span class="eyebrow">Alagoa</span>
      <strong>${alagoaSummary.total}</strong>
      <span class="muted-copy">Musicas no acervo Alagoa</span>
    </article>
    <article class="stat-card">
      <span class="eyebrow">Catalogo total</span>
      <strong>${state.catalog.length}</strong>
      <span class="muted-copy">Todas as musicas disponiveis neste navegador</span>
    </article>
    <article class="stat-card stat-card-centered">
      <div class="weekly-selector-nav">
        ${weeklySelectorLeftControl}
        <div class="weekly-selector-copy">
          <span class="eyebrow">Escala da semana</span>
          <strong>${escapeHtml(weeklySelector.name)}</strong>
        </div>
        ${weeklySelectorRightControl}
      </div>
    </article>
  `;
}

function getRecentAddedSongs(limit = 8) {
  return [...state.catalog]
    .filter((song) => !cleanText(song.id).startsWith("seed-") && Boolean(resolveSongCoverUrl(song)))
    .sort((leftSong, rightSong) => {
      const leftTime = new Date(leftSong.createdAt || leftSong.updatedAt || 0).getTime();
      const rightTime = new Date(rightSong.createdAt || rightSong.updatedAt || 0).getTime();
      return rightTime - leftTime;
    })
    .slice(0, limit);
}

function renderRecentAdditionsPanel() {
  if (!elements.recentAdditionsPanel) {
    return;
  }

  const recentSongs = getRecentAddedSongs(8);
  elements.recentAdditionsPanel.hidden = recentSongs.length === 0;

  if (!recentSongs.length) {
    elements.recentAdditionsPanel.innerHTML = "";
    return;
  }

  elements.recentAdditionsPanel.innerHTML = `
    <div class="recent-additions-head">
      <div>
        <p class="eyebrow">Novas musicas adicionadas</p>
      </div>
    </div>
    <div class="recent-additions-list">
      ${recentSongs.map((song) => {
        const hasCover = Boolean(resolveSongCoverUrl(song));
        const openMarkup = hasCover
          ? `<button class="recent-song-open" type="button" data-recent-song-id="${escapeHtml(song.id)}" aria-label="Abrir ${escapeHtml(song.title)}">
               ${renderArtworkMarkup(song, "recent")}
             </button>`
          : `<div class="recent-song-open is-disabled" aria-disabled="true">
               ${renderArtworkMarkup(song, "recent")}
             </div>`;
        const deleteMarkup = isAdminUser()
          ? `<button class="danger-button recent-song-delete" type="button" data-delete-song="${escapeHtml(song.id)}">Excluir</button>`
          : "";

        return `
          <article class="recent-song-card ${hasCover ? "" : "is-disabled"}">
            ${openMarkup}
            ${deleteMarkup}
          </article>
        `;
      }).join("")}
    </div>
  `;
}

function shiftWeeklySelector(direction) {
  const nextDirection = Number(direction);

  if (!Number.isFinite(nextDirection) || !nextDirection) {
    return;
  }

  state.manualRotationOffset = (Number(state.manualRotationOffset) || 0) + nextDirection;
  writeAppMetaCache({
    manualRotationOffset: state.manualRotationOffset
  });
  queueSharedStateSync({
    immediate: true,
    silent: false
  });
  renderAll();
}

function openRecentSong(songId) {
  const song = state.catalog.find((item) => item.id === cleanText(songId));

  if (!song) {
    setFlash("Nao encontrei a musica para abrir.", "error");
    return;
  }

  state.activeProducer = song.producer === "alagoa" ? "alagoa" : "elite";
  state.selectedSongId = song.id;
  renderAll();
}

function renderWeeklySelectionsPanel() {
  if (!elements.weeklySelectionsPanel) {
    return;
  }

  const selectedSongs = getWeeklySelectedSongs();
  elements.weeklySelectionsPanel.hidden = selectedSongs.length === 0;

  if (!selectedSongs.length) {
    elements.weeklySelectionsPanel.innerHTML = "";
    return;
  }

  elements.weeklySelectionsPanel.innerHTML = `
    <div class="weekly-selections-head">
      <div>
        <p class="eyebrow">Semana</p>
        <h3>Musicas selecionadas da semana</h3>
      </div>
    </div>

    <div class="weekly-selections-list">
      ${selectedSongs.map((song) => `
        <article class="weekly-selection-card">
          <button class="weekly-selection-open" type="button" data-weekly-song-id="${escapeHtml(song.id)}">
            ${renderArtworkMarkup(song, "recent")}
            <div class="weekly-selection-copy">
              <strong>${escapeHtml(song.title)}</strong>
              <span>${escapeHtml(song.artist)}</span>
            </div>
          </button>

          ${
            canManageWeeklySelection(song.id)
              ? `<button class="danger-button weekly-selection-remove" type="button" data-remove-weekly-song="${escapeHtml(song.id)}">
                  Remover
                </button>`
              : ""
          }
        </article>
      `).join("")}
    </div>
  `;
}

function renderTabs() {
  const eliteActive = state.activeProducer === "elite";
  const alagoaActive = state.activeProducer === "alagoa";

  elements.screenElite.classList.toggle("is-active", eliteActive);
  elements.screenElite.setAttribute("aria-selected", String(eliteActive));
  elements.screenAlagoa.classList.toggle("is-active", alagoaActive);
  elements.screenAlagoa.setAttribute("aria-selected", String(alagoaActive));
}

function renderScreenBanner() {
  const producer = PRODUCERS[state.activeProducer];
  const memberWelcomeMessage = isMemberUser() && cleanText(state.currentMemberUsername)
    ? `<p class="banner-welcome">${escapeHtml(getAccessGreetingByTime())}, ${escapeHtml(state.currentMemberUsername)}. Deus te aben&ccedil;oe.</p>`
    : "";

  elements.screenBanner.style.setProperty("--banner-accent", producer.accent);
  elements.screenBanner.innerHTML = `
    <div class="banner-layout">
      <div>
        <h3>${escapeHtml(producer.name)}</h3>
        ${memberWelcomeMessage}
      </div>
    </div>
  `;
}

function renderSongsPanel(visibleSongs) {
  const producerName = formatProducerName(state.activeProducer);

  elements.songsTitle.textContent = producerName;
  elements.songsCount.textContent = `${visibleSongs.length} faixas`;
  elements.favoritesFilterButton.setAttribute("aria-pressed", String(state.favoritesOnly));
  elements.favoritesFilterButton.textContent = state.favoritesOnly ? "Favoritas ligadas" : "Favoritas";

  if (!visibleSongs.length) {
    elements.songList.innerHTML = `
      <div class="empty-state">
        <strong>Nenhuma musica encontrada.</strong>
        <p>Limpe a busca, desligue o filtro de favoritas ou adicione novas musicas pelo cadastro de musica.</p>
      </div>
    `;
    return;
  }

  const producer = PRODUCERS[state.activeProducer];

  elements.songList.innerHTML = visibleSongs
    .map((song) => {
      const isActive = state.selectedSongId === song.id;
      const favoriteLabel = isFavorite(song.id) ? '<span class="song-favorite-badge">Favorita</span>' : "";
      const showPosterCopy = !resolveSongCoverUrl(song);
      const songLabel = `${cleanText(song.artist) || "Ministerio"} - ${cleanText(song.title) || "Musica"}`;

      return `
        <button
          type="button"
          class="song-card ${isActive ? "is-active" : ""}"
          data-song-id="${escapeHtml(song.id)}"
          aria-label="${escapeHtml(songLabel)}"
          title="${escapeHtml(songLabel)}"
          style="--card-accent: ${producer.softAccent}; --card-border: ${producer.accent}; --card-shadow: ${producer.shadow};"
        >
          <div class="song-poster-media">
            ${renderArtworkMarkup(song, "card")}
          </div>

          <div class="song-poster-overlay">
            ${favoriteLabel ? `
              <div class="song-poster-top">
                <div class="song-poster-flags">${favoriteLabel}</div>
              </div>
            ` : ""}

            ${showPosterCopy ? `
              <div class="song-poster-copy">
                <p class="song-artist">${escapeHtml(song.artist)}</p>
                <h4 class="song-title">${escapeHtml(song.title)}</h4>
              </div>
            ` : ""}
          </div>
        </button>
      `;
    })
    .join("");
}

function formatLyricsMarkup(lyrics) {
  const normalizedLyrics = cleanMultilineText(lyrics);

  if (!normalizedLyrics) {
    return `
      <div class="lyrics-empty-state">
        <strong>Letra ainda nao cadastrada.</strong>
        <p>Abra o cadastro da musica e escreva a letra para ela aparecer aqui em tela cheia.</p>
      </div>
    `;
  }

  const html = escapeHtml(normalizedLyrics).replace(/\n/g, "<br>");
  return `<div class="lyrics-text">${html}</div>`;
}

function openSongYouTube(songId) {
  const song = state.catalog.find((item) => item.id === cleanText(songId));

  if (!song) {
    setFlash("Nao encontrei a musica para abrir.", "error");
    return;
  }

  const youtubeLink = cleanText(song.youtubeUrl);

  if (!youtubeLink) {
    setFlash("Cadastre o link do YouTube antes de abrir a musica.", "error");
    return;
  }

  window.open(youtubeLink, "_blank", "noopener,noreferrer");
}

function toggleLyricsMinistryMode() {
  state.lyricsMinistryMode = !state.lyricsMinistryMode;
  renderSongViewer();
}

function closeLyricsModal() {
  state.lyricsMinistryMode = false;
  state.selectedSongId = null;
  renderAll();
}

function renderSongViewer() {
  const song = getSelectedSong();
  const viewerPanel = elements.viewerPanel;
  const lyricsModal = elements.lyricsModal;
  const lyricsViewer = elements.lyricsViewer;

  if (viewerPanel) {
    viewerPanel.hidden = true;
  }

  elements.workspaceGrid.classList.add("is-compact");

  if (!lyricsModal || !lyricsViewer) {
    if (elements.songViewer) {
      elements.songViewer.innerHTML = "";
    }
    return;
  }

  if (!song) {
    lyricsModal.classList.add("is-hidden");
    lyricsModal.setAttribute("aria-hidden", "true");
    lyricsViewer.innerHTML = "";
    document.body.style.overflow = elements.adminModal.classList.contains("is-hidden") ? "" : "hidden";
    return;
  }

  const youtubeLink = cleanText(song.youtubeUrl);
  const hasYoutubeLink = Boolean(youtubeLink);
  const favorite = isFavorite(song.id);
  const weeklySelected = isWeeklySelected(song.id);
  const producerName = formatProducerName(song.producer);
  const lyricsMarkup = formatLyricsMarkup(song.lyrics);
  const ministryMode = state.lyricsMinistryMode;

  lyricsViewer.innerHTML = `
    <div class="lyrics-shell ${ministryMode ? "is-ministry" : ""}">
      <div class="lyrics-side">
        <div class="lyrics-head">
          <div>
            <p class="eyebrow">Letra da musica</p>
            <h3 id="lyrics-modal-title" class="viewer-title">${escapeHtml(song.title)}</h3>
            <p class="lyrics-artist">${escapeHtml(song.artist)}</p>
          </div>
        </div>

        ${renderArtworkMarkup(song, "viewer")}

        <div class="viewer-link-panel">
          <span class="viewer-link-label">Acervo</span>
          <p class="viewer-link-empty">${escapeHtml(producerName)}</p>
        </div>

        <div class="viewer-link-panel">
          <span class="viewer-link-label">Link do YouTube</span>
          ${
            hasYoutubeLink
              ? `
                <a class="viewer-link-value" href="${escapeHtml(youtubeLink)}" target="_blank" rel="noreferrer">
                  ${escapeHtml(youtubeLink)}
                </a>
              `
              : `
                <p class="viewer-link-empty">Link do YouTube ainda nao cadastrado.</p>
              `
          }
        </div>

        <div class="action-row">
          <button
            class="action-button"
            type="button"
            data-open-youtube="${escapeHtml(song.id)}"
            ${hasYoutubeLink ? "" : "disabled"}
          >
            Abrir YouTube
          </button>
          <button
            class="secondary-button favorite-action-button ${favorite ? "is-active" : ""}"
            type="button"
            data-toggle-favorite="${escapeHtml(song.id)}"
            aria-pressed="${favorite ? "true" : "false"}"
          >
            ${favorite ? "Remover dos favoritos" : "Favoritar"}
          </button>
          <button
            class="secondary-button"
            type="button"
            data-share-song="${escapeHtml(song.id)}"
            ${hasYoutubeLink ? "" : "disabled"}
          >
            Compartilhar
          </button>
          <button
            class="secondary-button ${weeklySelected ? "is-active" : ""}"
            type="button"
            data-select-weekly-song="${escapeHtml(song.id)}"
          >
            ${weeklySelected ? "Ir para selecionadas da semana" : "Selecionar da semana"}
          </button>
        </div>
      </div>

      <div class="lyrics-main">
        <div class="lyrics-main-head">
          <div class="lyrics-main-copy">
            <p class="eyebrow">${ministryMode ? "Modo ministracao" : "Letra completa"}</p>
            <h4>${escapeHtml(song.title)}</h4>
            <p class="lyrics-artist">${escapeHtml(song.artist)}</p>
          </div>

          <div class="lyrics-head-actions">
            <button
              class="secondary-button ministry-toggle-button ${ministryMode ? "is-active" : ""}"
              type="button"
              data-toggle-ministration="true"
              aria-pressed="${ministryMode ? "true" : "false"}"
            >
              ${ministryMode ? "Sair do modo ministracao" : "Modo ministracao"}
            </button>
            <button class="icon-button" type="button" data-close-lyrics="true" aria-label="Fechar letra">
              x
            </button>
          </div>
        </div>

        ${ministryMode ? `
          <div class="lyrics-ministry-note">
            <span>Foco total na letra para ministracao.</span>
          </div>
        ` : ""}

        <div class="lyrics-panel">
          ${lyricsMarkup}
        </div>
      </div>
    </div>
  `;

  lyricsModal.classList.remove("is-hidden");
  lyricsModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function renderAdminAuthView() {
  if (elements.adminAuthView) {
    elements.adminAuthView.innerHTML = "";
    elements.adminAuthView.hidden = true;
  }
}

function getFilteredAdminSongs() {
  const filter = normalizeSearch(state.adminFilter);
  const baseSongs = isAdminAssetsMode()
    ? getSongsByProducer(getAdminProducerFilter())
    : [...state.catalog];

  return [...baseSongs]
    .filter((song) => {
      if (!filter) {
        return true;
      }

      return normalizeSearch(`${song.artist} ${song.title} ${song.source} ${song.notes} ${song.producer}`).includes(filter);
    })
    .sort((left, right) => new Date(right.updatedAt).getTime() - new Date(left.updatedAt).getTime());
}

function buildAdminResultsMeta(adminSongs = getFilteredAdminSongs()) {
  const totalCount = isAdminAssetsMode()
    ? getSongsByProducer(getAdminProducerFilter()).length
    : state.catalog.length;
  const filteredCount = adminSongs.length;
  const producerName = formatProducerName(getAdminProducerFilter());

  if (!totalCount) {
    return {
      countLabel: "0 musicas",
      helperLabel: isAdminAssetsMode()
        ? `Nenhuma musica encontrada em ${producerName}.`
        : "Use o formulario para cadastrar a primeira musica do catalogo."
    };
  }

  if (!state.adminFilter) {
    return {
      countLabel: `${filteredCount} ${filteredCount === 1 ? "musica" : "musicas"}`,
      helperLabel: isAdminAssetsMode()
        ? `Edite capa, letra e link das musicas do ${producerName}.`
        : "Edite capa, letra e link das musicas do acervo."
    };
  }

  return {
    countLabel: `${filteredCount} ${filteredCount === 1 ? "resultado" : "resultados"}`,
    helperLabel: `Mostrando ${filteredCount} de ${totalCount} musicas para "${state.adminFilter}".`
  };
}

function buildAdminSongListMarkup(adminSongs) {
  if (!adminSongs.length) {
    return `
      <div class="empty-state">
        <strong>${state.adminFilter ? "Nenhuma musica encontrada neste filtro." : "Nenhuma musica cadastrada ainda."}</strong>
        <p>${state.adminFilter ? "Tente outro termo ou limpe a busca para ver o catalogo completo." : "Cadastre uma musica nova primeiro para depois completar capa e link por aqui."}</p>
      </div>
    `;
  }

  return adminSongs
    .map((song) => {
      const producerLabel = song.producer === "alagoa" ? "Alagoa" : "Elite";
      const hasCover = Boolean(resolveSongCoverUrl(song));
      const hasLink = Boolean(song.videoId);

      return `
        <article class="admin-song-card ${song.producer === "alagoa" ? "is-alagoa" : ""}">
          <div class="admin-song-art">
            ${renderArtworkMarkup(song, "admin-list")}
          </div>

          <div class="admin-song-body">
            <div class="admin-song-top">
              <div>
                <p class="admin-song-artist">${escapeHtml(song.artist)}</p>
                <h5>${escapeHtml(song.title)}</h5>
              </div>
              <span class="status-pill is-pending">Acervo</span>
            </div>

            <div class="badge-row">
              <span class="badge">${producerLabel}</span>
              <span class="badge ${hasLink ? "is-favorite" : ""}">${hasLink ? "Link salvo" : "Sem link"}</span>
              <span class="badge ${hasCover ? "is-favorite" : ""}">${hasCover ? "Capa salva" : "Sem capa"}</span>
            </div>

            <div class="card-actions admin-song-actions">
              <button class="secondary-button" type="button" data-edit-song="${escapeHtml(song.id)}">Editar</button>
              <button class="danger-button" type="button" data-delete-song="${escapeHtml(song.id)}">Excluir</button>
            </div>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderAdminSongList() {
  const adminSongList = elements.adminModal.querySelector(".admin-song-list");
  const adminResultsCount = elements.adminModal.querySelector("[data-admin-results-count]");
  const adminResultsHelper = elements.adminModal.querySelector("[data-admin-results-helper]");

  if (!adminSongList) {
    return;
  }

  const adminSongs = getFilteredAdminSongs();
  const adminResultsMeta = buildAdminResultsMeta(adminSongs);

  adminSongList.innerHTML = buildAdminSongListMarkup(adminSongs);

  if (adminResultsCount) {
    adminResultsCount.textContent = adminResultsMeta.countLabel;
  }

  if (adminResultsHelper) {
    adminResultsHelper.textContent = adminResultsMeta.helperLabel;
  }
}

function renderAdminLoginGate() {
  elements.adminDashboardView.innerHTML = `
    <div class="admin-shell">
      <div class="admin-auth-shell">
        <section class="admin-card admin-auth-card admin-auth-side">
          <p class="eyebrow">Catalogo aberto</p>
          <h4>O louvor pode consultar, mas o cadastro fica protegido</h4>
          <p class="helper-text">A parte publica continua liberada para o grupo. So o cadastro de musicas exige login do administrador.</p>

          <div class="admin-auth-points">
            <article>
              <strong>Catalogo sincronizado</strong>
              <span>As musicas e capas podem aparecer iguais no computador e no celular.</span>
            </article>
            <article>
              <strong>Cadastro protegido</strong>
              <span>Somente o administrador entra para adicionar, editar e excluir musicas.</span>
            </article>
            <article>
              <strong>Uso simples</strong>
              <span>Depois do login, o painel abre direto para voce continuar o cadastro.</span>
            </article>
          </div>
        </section>

        <section class="admin-card admin-auth-card">
          <div class="admin-card-head">
            <div>
              <p class="eyebrow">Admin</p>
              <h4>Entrar para cadastrar</h4>
            </div>
            <span class="badge">Google Sheets</span>
          </div>

          <form id="cloud-admin-login-form" class="admin-form-grid">
            <div class="field-block full">
              <label for="cloud-admin-username">Usuario do administrador</label>
              <input id="cloud-admin-username" class="admin-input" name="admin-username" type="text" autocomplete="username" placeholder="Ex.: admin">
            </div>

            <div class="field-block full">
              <label for="cloud-admin-key">Senha do administrador</label>
              <input id="cloud-admin-key" class="admin-input" name="admin-password" type="password" autocomplete="current-password" placeholder="Sua senha admin">
            </div>

            <div class="field-block full inline-actions">
              <button class="action-button" type="submit">Entrar no cadastro</button>
            </div>
          </form>
        </section>
      </div>
    </div>
  `;
}

function buildAdminAuthButtonMarkup() {
  return isCloudModeActive()
    ? `<button class="secondary-button" type="button" data-cloud-signout="true">Sair</button>`
    : "";
}

function buildCoverUploadFieldMarkup(previewCoverUrl, title, artist) {
  return `
    <div class="field-block full">
      <label for="song-cover-file">Capa da musica</label>
      <div class="admin-cover-upload">
        <input id="song-cover-file" class="admin-input admin-file-input" type="file" accept="image/*">
        <button class="secondary-button" type="button" data-remove-cover="true" ${previewCoverUrl ? "" : "disabled"}>Remover capa</button>
      </div>
      <span id="song-cover-hint" class="helper-text">${previewCoverUrl ? "Capa pronta. Se quiser trocar, escolha outra imagem." : "Envie uma imagem do celular ou computador."}</span>
    </div>

    <div class="field-block full">
      <span>Preview da capa</span>
      <div id="song-cover-preview" class="admin-cover-preview">
        ${renderArtworkMarkup({
          title,
          artist,
          coverUrl: previewCoverUrl
        }, "admin")}
      </div>
    </div>
  `;
}

function buildMemberAccountsListMarkup() {
  if (!state.memberAccounts.length) {
    return `
      <div class="member-access-empty">
        <strong>Nenhum membro cadastrado ainda.</strong>
        <p>Quando voce criar o primeiro usuario, o app passa a pedir login para o pessoal acessar o acervo.</p>
      </div>
    `;
  }

  return `
    <div class="member-access-list">
      ${state.memberAccounts.map((member) => `
        <article class="member-access-item">
          <div>
            <strong>${escapeHtml(member)}</strong>
            <span>Login ativo para acesso ao acervo</span>
          </div>
          <button class="danger-button" type="button" data-delete-member="${escapeHtml(member)}">Excluir</button>
        </article>
      `).join("")}
    </div>
  `;
}

function buildAccessSettingsMarkup() {
  const authButton = buildAdminAuthButtonMarkup();

  return `
    <section class="admin-card admin-settings-card">
      <div class="admin-card-head">
        <div>
          <p class="eyebrow">Escala e acessos</p>
          <h4>Cadastrar usuario e ajustar a rotacao da semana</h4>
        </div>
        <div class="admin-head-actions">
          <span class="badge">${state.memberAccounts.length} ${state.memberAccounts.length === 1 ? "usuario" : "usuarios"}</span>
          ${authButton}
        </div>
      </div>

      <div class="admin-settings-stack">
        <form id="rotation-settings-form" class="admin-form-grid">
          <div class="field-block full">
            <label for="rotation-names">Rotacao da semana</label>
            <textarea id="rotation-names" class="admin-textarea" name="rotation-names" placeholder="Um nome por linha">${escapeHtml(state.rotationNames.join("\n"))}</textarea>
            <p class="helper-text">Use um nome por linha na ordem certa. O app vai repetir automaticamente a sequencia.</p>
          </div>

          <div class="field-block">
            <label for="rotation-anchor">Semana inicial</label>
            <input id="rotation-anchor" class="admin-input" name="rotation-anchor" type="date" value="${escapeHtml(normalizeRotationAnchorValue(state.rotationAnchor))}">
          </div>

          <div class="field-block admin-field-align-end">
            <button class="action-button" type="submit">Salvar rotacao</button>
          </div>
        </form>

        <div class="admin-settings-divider"></div>

        <form id="member-access-form" class="admin-form-grid" autocomplete="off">
          <div class="field-block">
            <label for="member-access-username">Usuario do membro</label>
            <input id="member-access-username" class="admin-input" name="member-username" type="text" autocomplete="off" autocapitalize="none" autocorrect="off" spellcheck="false" data-lpignore="true" placeholder="Usuario para entrar no app">
          </div>

          <div class="field-block">
            <label for="member-access-password">Senha do membro</label>
            <input id="member-access-password" class="admin-input" name="member-password" type="password" autocomplete="new-password" autocapitalize="none" autocorrect="off" spellcheck="false" data-lpignore="true" placeholder="Senha do membro">
          </div>

          <div class="field-block full inline-actions">
            <button class="action-button" type="submit">Cadastrar usuario</button>
          </div>
        </form>

        <p class="helper-text">Se quiser, voce pode usar um unico usuario e senha para todo o grupo de membros.</p>

        ${buildMemberAccountsListMarkup()}
      </div>
    </section>
  `;
}

function clearMemberAccessFormFields() {
  const memberAccessForm = elements.adminModal?.querySelector("#member-access-form");

  if (!(memberAccessForm instanceof HTMLFormElement)) {
    return;
  }

  const resetFields = () => {
    memberAccessForm.reset();

    const usernameInput = memberAccessForm.querySelector('input[name="member-username"]');
    const passwordInput = memberAccessForm.querySelector('input[name="member-password"]');

    if (usernameInput instanceof HTMLInputElement) {
      usernameInput.value = "";
      usernameInput.setAttribute("value", "");
    }

    if (passwordInput instanceof HTMLInputElement) {
      passwordInput.value = "";
      passwordInput.setAttribute("value", "");
    }
  };

  resetFields();
  window.setTimeout(resetFields, 0);
  window.setTimeout(resetFields, 180);
}

function buildCreateSongFormMarkup() {
  const previewCoverUrl = getAdminCoverPreviewUrl();
  const authButton = buildAdminAuthButtonMarkup();

  return `
    <div class="admin-shell admin-shell-create">
      <section class="admin-card admin-form-card admin-create-card" data-admin-form-card="true">
        <div class="admin-card-head">
          <div>
            <p class="eyebrow">Novo cadastro</p>
            <h4>Novo cadastro</h4>
          </div>
          <div class="admin-head-actions">
            ${authButton}
          </div>
        </div>

        <form id="admin-song-form" class="admin-form-grid admin-form-grid-clean">
          <input type="hidden" name="song-id" value="">

          <div class="field-block full">
            <span>Adicionar ao acervo</span>
            <div class="producer-choice-group" role="radiogroup" aria-label="Escolha o acervo da musica">
              <label class="producer-choice-option">
                <input type="radio" name="producer" value="elite" ${state.activeProducer === "alagoa" ? "" : "checked"}>
                <span>Multitracks Elite</span>
              </label>
              <label class="producer-choice-option producer-choice-option-alagoa">
                <input type="radio" name="producer" value="alagoa" ${state.activeProducer === "alagoa" ? "checked" : ""}>
                <span>Multitracks Alagoa</span>
              </label>
            </div>
          </div>

          <div class="field-block">
            <label for="song-artist">Nome do artista</label>
            <input id="song-artist" class="admin-input" name="artist" type="text" data-form-focus="true" placeholder="Nome do artista">
          </div>

          <div class="field-block">
            <label for="song-title">Titulo da musica</label>
            <input id="song-title" class="admin-input" name="title" type="text" placeholder="Titulo da musica">
          </div>

          <div class="field-block full">
            <label for="song-youtube-url">Link do YouTube</label>
            <input id="song-youtube-url" class="admin-input" name="youtube-url" type="url" placeholder="https://www.youtube.com/watch?v=...">
          </div>

          <div class="field-block full">
            <label for="song-lyrics">Letra da musica</label>
            <textarea id="song-lyrics" class="admin-textarea" name="lyrics" placeholder="Escreva aqui a letra da musica do seu jeito..."></textarea>
          </div>

          ${buildCoverUploadFieldMarkup(previewCoverUrl, "Nova musica", "Ministerio")}

          <div class="field-block full inline-actions">
            <button class="action-button" type="submit">Adicionar musica</button>
            <button class="secondary-button" type="button" data-clear-song-form="true">Limpar campos</button>
          </div>
        </form>
      </section>
    </div>
  `;
}

function buildAssetEditorMarkup(editingSong) {
  if (!editingSong) {
    return "";
  }

  const authButton = buildAdminAuthButtonMarkup();
  const previewCoverUrl = getAdminCoverPreviewUrl();
  const producerName = formatProducerName(editingSong.producer);

  return `
    <section class="admin-card admin-form-card" data-admin-form-card="true">
      <div class="admin-card-head">
        <div>
          <p class="eyebrow">Edicao</p>
          <h4>Editar capa, letra e link</h4>
        </div>
        <div class="admin-head-actions">
          <span class="badge">${escapeHtml(producerName)}</span>
          ${authButton}
        </div>
      </div>

      <p class="helper-text admin-intro-copy">Atualize a faixa do acervo com capa, letra e link do YouTube sem mexer no restante do cadastro.</p>

      <form id="admin-song-form" class="admin-form-grid">
        <input type="hidden" name="song-id" value="${escapeHtml(editingSong.id)}">

        <div class="field-block">
          <label for="song-artist">Nome do artista</label>
          <input id="song-artist" class="admin-input is-readonly" name="artist" type="text" value="${escapeHtml(editingSong.artist || "")}" readonly>
        </div>

        <div class="field-block">
          <label for="song-title">Titulo da musica</label>
          <input id="song-title" class="admin-input is-readonly" name="title" type="text" value="${escapeHtml(editingSong.title || "")}" readonly>
        </div>

        <div class="field-block full">
          <label for="song-youtube-url">Link do YouTube</label>
          <input id="song-youtube-url" class="admin-input" name="youtube-url" type="url" data-form-focus="true" value="${escapeHtml(editingSong.youtubeUrl || "")}" placeholder="https://www.youtube.com/watch?v=...">
        </div>

        <div class="field-block full">
          <label for="song-lyrics">Letra da musica</label>
          <textarea id="song-lyrics" class="admin-textarea" name="lyrics" placeholder="Escreva aqui a letra da musica do seu jeito...">${escapeHtml(editingSong.lyrics || "")}</textarea>
        </div>

        ${buildCoverUploadFieldMarkup(previewCoverUrl, editingSong.title || "Musica", editingSong.artist || "Ministerio")}

        <div class="field-block full inline-actions">
          <button class="action-button" type="submit">Salvar alteracoes</button>
          <button class="secondary-button" type="button" data-clear-song-form="true">Voltar para musicas</button>
          <button class="danger-button" type="button" data-delete-song="${escapeHtml(editingSong.id)}">Excluir musica</button>
        </div>
      </form>
    </section>
  `;
}

function renderAdminCreateView() {
  elements.adminDashboardView.innerHTML = buildCreateSongFormMarkup();
}

function renderAdminUsersView() {
  elements.adminDashboardView.innerHTML = `
    <div class="admin-shell admin-shell-users">
      ${buildAccessSettingsMarkup()}
    </div>
  `;
}

function renderAdminAssetsView() {
  const editingSong = state.catalog.find((song) => song.id === state.editingSongId) || null;
  const filteredSongs = getFilteredAdminSongs();
  const adminResultsMeta = buildAdminResultsMeta(filteredSongs);
  const producerFilter = getAdminProducerFilter();
  const authButton = buildAdminAuthButtonMarkup();

  if (editingSong) {
    elements.adminDashboardView.innerHTML = `
      <div class="admin-shell admin-shell-assets-edit">
        ${buildAssetEditorMarkup(editingSong)}
      </div>
    `;
    return;
  }

  elements.adminDashboardView.innerHTML = `
    <div class="admin-shell admin-shell-assets">
      <section class="admin-card admin-list-card">
        <div class="admin-list-head">
          <div>
            <p class="eyebrow">Acervo</p>
            <h4>Musicas do acervo</h4>
          </div>

          <div class="admin-list-tools">
            <div class="admin-head-actions">
              ${authButton}
            </div>

            <div class="producer-choice-group producer-choice-group-admin" role="radiogroup" aria-label="Escolha o acervo para editar">
              <label class="producer-choice-option">
                <input type="radio" name="asset-producer" value="elite" ${producerFilter === "elite" ? "checked" : ""}>
                <span>Multitracks Elite</span>
              </label>
              <label class="producer-choice-option producer-choice-option-alagoa">
                <input type="radio" name="asset-producer" value="alagoa" ${producerFilter === "alagoa" ? "checked" : ""}>
                <span>Multitracks Alagoa</span>
              </label>
            </div>

            <label class="search-field" for="admin-song-filter">
              <span class="sr-only">Filtrar musicas do acervo</span>
              <input id="admin-song-filter" type="search" value="${escapeHtml(state.adminFilter)}" placeholder="Filtrar por artista ou musica">
            </label>

            <span class="badge admin-results-pill" data-admin-results-count>${escapeHtml(adminResultsMeta.countLabel)}</span>
          </div>
        </div>

        <p class="helper-text admin-list-meta" data-admin-results-helper>${escapeHtml(adminResultsMeta.helperLabel)}</p>

        <div class="admin-song-list">
          ${buildAdminSongListMarkup(filteredSongs)}
        </div>
      </section>
    </div>
  `;
}

function renderAdminDashboardView() {
  elements.adminDashboardView.hidden = false;

  if (isCloudModeActive() && !state.adminLoggedIn) {
    renderAdminLoginGate();
    return;
  }

  if (isAdminUsersMode()) {
    renderAdminUsersView();
    return;
  }

  if (isAdminAssetsMode()) {
    renderAdminAssetsView();
    return;
  }

  renderAdminCreateView();
}

function renderAdminViews() {
  renderAdminModalHead();
  renderAdminDashboardView();
  renderAdminFlash();
}

function renderAll() {
  ensureWeeklySelectionsCurrentWeek();
  syncWeeklySelectedSongs();
  ensureSelectedSong();
  syncHash();
  renderAccessControls();
  renderMemberLoginOverlay();
  renderHeroStats();
  renderTabs();
  renderScreenBanner();
  renderRecentAdditionsPanel();
  renderWeeklySelectionsPanel();
  renderSongsPanel(getVisibleSongs());
  renderSongViewer();
  renderAdminViews();
  elements.searchInput.value = state.query;
  savePreferences();
}

function selectProducer(producer) {
  state.activeProducer = producer === "alagoa" ? "alagoa" : "elite";
  renderAll();
}

function selectSong(songId) {
  const normalizedSongId = cleanText(songId) || null;
  state.selectedSongId = state.selectedSongId === normalizedSongId ? null : normalizedSongId;
  renderAll();
}

async function openAdminModal(mode = "create") {
  setAdminModalMode(mode);
  state.editingSongId = null;
  state.adminFilter = "";
  setAdminProducerFilter(state.activeProducer);
  resetAdminCoverDraft();

  renderAdminViews();
  elements.adminModal.classList.remove("is-hidden");
  elements.adminModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  if (isAdminUsersMode()) {
    clearMemberAccessFormFields();
  }
  focusAdminSongForm();

  if (isGoogleSheetsConfigured()) {
    try {
      await refreshCloudAdminState();
      applyAppMeta(await fetchCloudAppMeta());
      renderAdminViews();
      if (isAdminUsersMode()) {
        clearMemberAccessFormFields();
      }
      focusAdminSongForm();
    } catch (error) {
      console.warn("Nao consegui atualizar a escala e os acessos antes de abrir o painel.", error);
    }
  }
}

function closeAdminModal() {
  elements.adminModal.classList.add("is-hidden");
  elements.adminModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function focusAdminSongForm() {
  window.requestAnimationFrame(() => {
    const focusTarget = elements.adminModal.querySelector("[data-form-focus='true']");

    const isMobileViewport = window.matchMedia("(max-width: 860px)").matches;

    if (isMobileViewport) {
      return;
    }

    if (focusTarget instanceof HTMLInputElement || focusTarget instanceof HTMLTextAreaElement) {
      try {
        focusTarget.focus({ preventScroll: true });
      } catch (_error) {
        focusTarget.focus();
      }

      if (!focusTarget.hasAttribute("readonly") && "select" in focusTarget) {
        focusTarget.select();
      }
    }
  });
}

function resetSongForm() {
  state.editingSongId = null;
  resetAdminCoverDraft();
  renderAdminDashboardView();
  focusAdminSongForm();
}

async function saveSongFromForm(formData) {
  const songId = cleanText(formData.get("song-id"));
  const currentSong = songId ? state.catalog.find((song) => song.id === songId) : null;
  const requestedProducer = cleanText(formData.get("producer"));
  const producer = currentSong?.producer || (requestedProducer === "alagoa" ? "alagoa" : requestedProducer === "elite" ? "elite" : state.activeProducer);
  const artist = cleanText(formData.get("artist"));
  const title = cleanText(formData.get("title"));
  const lyrics = cleanMultilineText(formData.get("lyrics"));
  const source = cleanText(formData.get("source")) || currentSong?.source || "";
  const notes = cleanText(formData.get("notes")) || currentSong?.notes || "";
  const youtubeUrl = cleanText(formData.get("youtube-url"));
  const currentCoverUrl = cleanText(currentSong?.coverUrl);
  const currentCoverFileId = cleanText(currentSong?.coverFileId);
  const currentCoverAssetId = cleanText(currentSong?.coverAssetId);
  const currentResolvedCoverUrl = resolveSongCoverUrl(currentSong);
  const draftCoverUrl = state.adminCoverDraftChanged
    ? state.adminCoverDraftUrl
    : currentResolvedCoverUrl;
  const parsedYouTube = parseYouTubeInput(youtubeUrl);
  const nextSongId = songId || buildId();

  if (!artist || !title) {
    setFlash("Preencha artista e titulo da musica.", "error");
    return;
  }

  if (youtubeUrl && !parsedYouTube.videoId) {
    setFlash("Cole um link valido do YouTube ou deixe o campo vazio por enquanto.", "error");
    return;
  }

  if (isCloudModeActive() && !state.adminLoggedIn) {
    setFlash("Entre como administrador para cadastrar ou editar musicas.", "error");
    return;
  }

  if (songId) {
    if (!currentSong) {
      setFlash("Nao encontrei a musica que voce tentou editar.", "error");
      return;
    }
  }

  try {
    let finalCoverUrl = currentCoverUrl;
    let finalCoverFileId = currentCoverFileId;
    let finalCoverAssetId = currentCoverAssetId;

    if (isCloudModeActive()) {
      if (state.adminCoverDraftChanged) {
        const uploadedCover = cleanText(draftCoverUrl)
          ? await uploadCoverToCloud(nextSongId, producer, draftCoverUrl)
          : { coverUrl: "", coverFileId: "" };

        finalCoverUrl = uploadedCover.coverUrl;
        finalCoverFileId = uploadedCover.coverFileId;
      } else {
        finalCoverUrl = currentCoverUrl;
        finalCoverFileId = currentCoverFileId;
      }

      if (currentCoverAssetId) {
        await deleteCoverAsset(currentCoverAssetId);
      }

      finalCoverAssetId = "";
    } else if (cleanText(draftCoverUrl).startsWith("data:image/")) {
      const assetId = currentCoverAssetId || nextSongId;
      const assetSaved = await saveCoverAsset(assetId, draftCoverUrl);

      if (assetSaved) {
        finalCoverUrl = "";
        finalCoverAssetId = assetId;
      } else {
        finalCoverUrl = draftCoverUrl;
        finalCoverAssetId = "";
      }
    } else {
      if (currentCoverAssetId) {
        await deleteCoverAsset(currentCoverAssetId);
      }

      finalCoverUrl = cleanText(draftCoverUrl);
      finalCoverAssetId = "";
    }

    const nextSong = createSongRecord({
      ...(currentSong || {}),
      id: nextSongId,
      producer,
      artist,
      title,
      lyrics,
      source,
      notes,
      coverUrl: finalCoverUrl,
      coverFileId: finalCoverFileId,
      coverAssetId: finalCoverAssetId,
      youtubeUrl: parsedYouTube.canonicalUrl,
      createdAt: currentSong?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    let persistedSong = isCloudModeActive()
      ? await saveSongToCloud(nextSong)
      : nextSong;
    clearSongCatalogKeyDeleted(persistedSong);

    const persistedSongKey = buildSongCatalogKey(persistedSong);
    const previousSongKey = currentSong ? buildSongCatalogKey(currentSong) : "";

    if (songId) {
      state.catalog = buildSeedBackedCatalog([
        ...state.catalog.filter((song) => {
          if (song.id === songId || song.id === persistedSong.id) {
            return false;
          }

          const songKey = buildSongCatalogKey(song);
          return songKey !== persistedSongKey && songKey !== previousSongKey;
        }),
        persistedSong
      ]);
      setFlash("Musica atualizada com sucesso.", "success");
    } else {
      state.catalog = buildSeedBackedCatalog([persistedSong, ...state.catalog]);
      setFlash("Musica adicionada ao catalogo.", "success");
    }

    if (isCloudModeActive()) {
      try {
        const rawCloudCatalog = await fetchCloudCatalog({
          seedBacked: false,
          dedupe: false,
          includeDeleted: true
        });
        await deleteCloudSongVariants(persistedSong, rawCloudCatalog, persistedSong.id);
        const syncedCatalog = await fetchCloudCatalog();
        const syncedSong = syncedCatalog.find((song) => {
          return song.id === persistedSong.id || buildSongCatalogKey(song) === persistedSongKey;
        });

        if (syncedCatalog.length) {
          state.catalog = syncedCatalog;
        }

        if (syncedSong) {
          persistedSong = syncedSong;
        }
      } catch (syncError) {
        console.warn("Nao consegui recarregar o catalogo remoto logo apos salvar a musica.", syncError);
      }
    }

    state.selectedSongId = songId ? persistedSong.id : null;
    state.activeProducer = producer;
    state.editingSongId = songId && isAdminAssetsMode() ? persistedSong.id : null;
    resetAdminCoverDraft();
    saveCatalog();
    renderAll();
  } catch (error) {
    console.error("Falha ao salvar musica.", error);
    setFlash(isCloudModeActive() ? "Nao consegui salvar na nuvem. Confira sua conexao e a configuracao." : "Nao consegui salvar essa musica.", "error");
  }
}

async function deleteSong(songId) {
  const song = state.catalog.find((item) => item.id === songId);

  if (!song) {
    setFlash("Nao encontrei a musica para excluir.", "error");
    return;
  }

  const confirmed = window.confirm(`Deseja excluir "${song.title}" do catalogo?`);

  if (!confirmed) {
    return;
  }

  if (isCloudModeActive() && !state.adminLoggedIn) {
    setFlash("Entre como administrador para excluir musicas.", "error");
    return;
  }

  try {
    if (isCloudModeActive()) {
      const rawCloudCatalog = await fetchCloudCatalog({
        seedBacked: false,
        dedupe: false,
        includeDeleted: true
      });
      await deleteCloudSongVariants(song, rawCloudCatalog);
    }

    if (song.coverAssetId) {
      await deleteCoverAsset(song.coverAssetId);
    }

    markSongCatalogKeyDeleted(song);
    state.catalog = filterDeletedCatalogSongs(buildSeedBackedCatalog(
      state.catalog.filter((item) => buildSongCatalogKey(item) !== buildSongCatalogKey(song) && item.id !== songId)
    ));

    if (isCloudModeActive()) {
      try {
        const syncedCatalog = await fetchCloudCatalog();

        if (syncedCatalog.length) {
          state.catalog = syncedCatalog;
        }
      } catch (syncError) {
        console.warn("Nao consegui recarregar o catalogo remoto logo apos excluir a musica.", syncError);
      }
    }

    if (state.selectedSongId === songId) {
      state.selectedSongId = null;
    }

    if (state.editingSongId === songId) {
      state.editingSongId = null;
    }

    saveCatalog();
    renderAll();
    setFlash("Musica excluida do catalogo.", "success");
  } catch (error) {
    console.error("Falha ao excluir musica.", error);
    setFlash(isCloudModeActive() ? "Nao consegui excluir na nuvem. Confira sua conexao e a configuracao." : "Nao consegui excluir essa musica.", "error");
  }
}

function startEditingSong(songId) {
  const song = state.catalog.find((item) => item.id === songId);

  if (!song) {
    setFlash("Nao encontrei a musica para editar.", "error");
    return;
  }

  setAdminModalMode("assets");
  setAdminProducerFilter(song.producer);
  state.editingSongId = song.id;
  resetAdminCoverDraft(resolveSongCoverUrl(song));
  renderAdminDashboardView();
  focusAdminSongForm();
  setFlash(`Editando: ${song.title}`, "success");
}

async function handleCloudAdminLoginSubmit(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const username = cleanText(formData.get("admin-username")) || "admin";
  const adminPassword = cleanText(formData.get("admin-password"));

  if (!username || !adminPassword) {
    setFlash("Preencha usuario e senha do administrador.", "error");
    return;
  }

  try {
    await signInCloudAdmin(username, adminPassword);
    try {
      await fetchCloudMembers();
    } catch (membersError) {
      console.warn("Nao consegui atualizar a lista de membros logo apos o login admin.", membersError);
    }
    renderAll();
    setFlash("Login do administrador realizado com sucesso.", "success");
  } catch (error) {
    console.error("Falha no login do administrador.", error);
    setFlash("Nao consegui entrar. Confira o usuario admin, a senha e a configuracao do Google Sheets.", "error");
  }
}

async function handleAccessLoginSubmit(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const username = cleanText(formData.get("login-username"));
  const password = cleanText(formData.get("login-password"));
  const rememberAccess = Boolean(formData.get("remember-access"));

  if (!username || !password) {
    setFlash("Preencha usuario e senha para entrar.", "error");
    return;
  }

  try {
    const localAdminConfig = getAdminConfig();

    try {
      if (isCloudModeActive()) {
        await signInCloudAdmin(username, password);
      } else if (localAdminConfig) {
        const sameUser = normalizeSearch(localAdminConfig.username) === normalizeSearch(username);
        const samePassword = localAdminConfig.passwordHash === simpleHash(password);

          if (!sameUser || !samePassword) {
            throw new Error("Usuario ou senha admin invalidos.");
          }

          state.currentMemberUsername = username;
          state.currentAccessHash = "";
          state.currentAccessRole = "admin";
          state.memberLoggedIn = false;
          writeAccessSession("admin", username);
          setAdminSession(true);
      } else {
        throw new Error("Administrador indisponivel.");
      }

      try {
        await fetchCloudMembers();
      } catch (membersError) {
        console.warn("Nao consegui atualizar os membros logo apos o login admin.", membersError);
      }

        if (rememberAccess) {
          writeRememberedAccess(username, password);
        } else {
          writeRememberedAccess("", "");
        }

        await refreshCloudState({ quiet: true });
        renderAll();
        setFlash("Administrador conectado com sucesso.", "success");
        return;
      } catch (adminError) {
      if (isCloudModeActive()) {
        try {
          await signInMemberCloud(username, password);
        } catch (cloudMemberError) {
          if (state.memberRecords.length) {
            signInMemberLocal(username, password);
          } else {
            throw cloudMemberError;
          }
        }
      } else {
        signInMemberLocal(username, password);
      }

        if (rememberAccess) {
          writeRememberedAccess(username, password);
        } else {
          writeRememberedAccess("", "");
        }

        await refreshCloudState({ quiet: true });
        renderAll();
        setFlash(`Acesso liberado para ${state.currentMemberUsername}.`, "success");
      }
  } catch (error) {
    console.error("Falha no login do app.", error);
    setFlash("Nao consegui entrar. Confira usuario e senha.", "error");
  }
}

async function handleRotationSettingsSubmit(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const rotationNames = sanitizeRotationNames(formData.get("rotation-names"));
  const rotationAnchor = normalizeRotationAnchorValue(formData.get("rotation-anchor"));

  try {
    if (isCloudModeActive()) {
      if (!state.adminLoggedIn) {
        setFlash("Entre como administrador para editar a rotacao.", "error");
        return;
      }

      await saveRotationSettingsToCloud(rotationNames, rotationAnchor);
    } else {
      const nextMeta = {
        rotationNames,
        rotationAnchor,
        memberLoginRequired: state.memberLoginRequired,
        memberAccounts: state.memberAccounts,
        memberRecords: state.memberRecords
      };
      writeAppMetaCache(nextMeta);
      applyAppMeta(nextMeta);
    }

    renderAll();
    setFlash("Rotacao semanal atualizada com sucesso.", "success");
  } catch (error) {
    console.error("Falha ao salvar rotacao semanal.", error);
    setFlash("Nao consegui salvar a rotacao agora.", "error");
  }
}

async function handleMemberAccessSubmit(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const username = cleanText(formData.get("member-username"));
  const password = cleanText(formData.get("member-password"));

  if (!username || !password) {
    setFlash("Preencha usuario e senha para criar o acesso do membro.", "error");
    return;
  }

  if (!state.adminLoggedIn) {
    setFlash("Entre como administrador antes de cadastrar acessos de membro.", "error");
    return;
  }

  try {
    const result = isCloudModeActive()
      ? await saveMemberToCloud(username, password)
      : (saveMemberLocally(username, password), { savedInCloud: false });
    event.target.reset();
    clearMemberAccessFormFields();
    renderAll();
    setFlash(
      result?.savedInCloud === false
        ? `Usuario ${username} salvo neste aparelho.`
        : `Acesso do membro ${username} salvo com sucesso.`,
      "success"
    );
  } catch (error) {
    console.error("Falha ao salvar acesso de membro.", error);
    setFlash("Nao consegui salvar esse acesso de membro.", "error");
  }
}

async function handleDeleteMember(username) {
  const normalizedUsername = cleanText(username);

  if (!normalizedUsername) {
    setFlash("Nao encontrei o membro para excluir.", "error");
    return;
  }

  if (!window.confirm(`Deseja excluir o acesso de ${normalizedUsername}?`)) {
    return;
  }

  try {
    const result = isCloudModeActive()
      ? await deleteMemberFromCloud(normalizedUsername)
      : (deleteMemberLocally(normalizedUsername), { removedFromCloud: false });

    if (normalizeSearch(state.currentMemberUsername) === normalizeSearch(normalizedUsername)) {
      signOutMember();
    }

    renderAll();
    setFlash(
      result?.removedFromCloud === false
        ? `Acesso de ${normalizedUsername} removido neste aparelho.`
        : `Acesso de ${normalizedUsername} removido.`,
      "success"
    );
  } catch (error) {
    console.error("Falha ao excluir acesso de membro.", error);
    setFlash("Nao consegui excluir esse acesso de membro.", "error");
  }
}

function handleAdminAuthSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const username = cleanText(formData.get("username"));
  const password = cleanText(formData.get("password"));

  if (!username || !password) {
    setFlash("Preencha usuario e senha.", "error");
    return;
  }

  if (!hasAdminConfig()) {
    const confirmPassword = cleanText(formData.get("confirm-password"));

    if (password !== confirmPassword) {
      setFlash("As senhas informadas nao conferem.", "error");
      return;
    }

    writeJson(STORAGE_KEYS.adminConfig, {
      username,
      passwordHash: simpleHash(password),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });

    setAdminSession(true);
    renderAll();
    setFlash("Acesso de administrador criado com sucesso.", "success");
    return;
  }

  const config = getAdminConfig();
  const sameUser = normalizeSearch(config.username) === normalizeSearch(username);
  const samePassword = config.passwordHash === simpleHash(password);

  if (!sameUser || !samePassword) {
    setFlash("Usuario ou senha incorretos.", "error");
    return;
  }

  setAdminSession(true);
  renderAll();
  setFlash("Login realizado com sucesso.", "success");
}

function handleAdminAccountSubmit(event) {
  event.preventDefault();

  const config = getAdminConfig();
  if (!config) {
    setFlash("Nenhum acesso administrativo foi configurado ainda.", "error");
    return;
  }

  const formData = new FormData(event.target);
  const username = cleanText(formData.get("new-username"));
  const password = cleanText(formData.get("new-password"));
  const confirmPassword = cleanText(formData.get("confirm-new-password"));

  if (!username) {
    setFlash("Informe um usuario para o acesso administrativo.", "error");
    return;
  }

  if (password && password !== confirmPassword) {
    setFlash("A nova senha e a confirmacao nao conferem.", "error");
    return;
  }

  writeJson(STORAGE_KEYS.adminConfig, {
    ...config,
    username,
    passwordHash: password ? simpleHash(password) : config.passwordHash,
    updatedAt: new Date().toISOString()
  });

  renderAll();
  setFlash("Acesso administrativo atualizado.", "success");
}

function shareSongToWhatsApp(songId) {
  const song = state.catalog.find((item) => item.id === cleanText(songId));

  if (!song) {
    setFlash("Nao encontrei a musica para compartilhar.", "error");
    return;
  }

  const youtubeLink = cleanText(song.youtubeUrl);

  if (!youtubeLink) {
    setFlash("Cadastre o link do YouTube antes de compartilhar.", "error");
    return;
  }

  const shareText = `${song.artist} - ${song.title}\n${youtubeLink}`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
  const openedWindow = window.open(whatsappUrl, "_blank", "noopener,noreferrer");

  if (!openedWindow) {
    window.location.href = whatsappUrl;
  }
}

function bindEvents() {
  elements.screenElite.addEventListener("click", () => {
    selectProducer("elite");
  });

  elements.screenAlagoa.addEventListener("click", () => {
    selectProducer("alagoa");
  });

  elements.searchInput.addEventListener("input", (event) => {
    state.query = preserveInputText(event.target.value);
    renderAll();
  });

  elements.favoritesFilterButton.addEventListener("click", () => {
    state.favoritesOnly = !state.favoritesOnly;
    renderAll();
  });

  elements.heroStats?.addEventListener("click", (event) => {
    const shiftButton = event.target.closest("[data-shift-weekly-selector]");

    if (!shiftButton) {
      return;
    }

    shiftWeeklySelector(shiftButton.dataset.shiftWeeklySelector);
  });

  elements.songList.addEventListener("click", (event) => {
    const button = event.target.closest("[data-song-id]");

    if (!button) {
      return;
    }

    selectSong(button.dataset.songId);
  });

  elements.recentAdditionsPanel?.addEventListener("click", (event) => {
    const deleteButton = event.target.closest("[data-delete-song]");

    if (deleteButton) {
      deleteSong(deleteButton.dataset.deleteSong);
      return;
    }

    const button = event.target.closest("[data-recent-song-id]");

    if (!button) {
      return;
    }

    openRecentSong(button.dataset.recentSongId);
  });

  elements.weeklySelectionsPanel?.addEventListener("click", (event) => {
    const removeButton = event.target.closest("[data-remove-weekly-song]");

    if (removeButton) {
      removeSongFromWeeklySelections(removeButton.dataset.removeWeeklySong);
      return;
    }

    const openButton = event.target.closest("[data-weekly-song-id]");

    if (!openButton) {
      return;
    }

    openRecentSong(openButton.dataset.weeklySongId);
  });

  elements.lyricsViewer.addEventListener("click", (event) => {
    const closeButton = event.target.closest("[data-close-lyrics]");
    if (closeButton) {
      closeLyricsModal();
      return;
    }

    const ministryButton = event.target.closest("[data-toggle-ministration]");
    if (ministryButton) {
      toggleLyricsMinistryMode();
      return;
    }

    const openYouTubeButton = event.target.closest("[data-open-youtube]");
    if (openYouTubeButton) {
      openSongYouTube(openYouTubeButton.dataset.openYoutube);
      return;
    }

    const favoriteButton = event.target.closest("[data-toggle-favorite]");
    if (favoriteButton) {
      toggleFavorite(favoriteButton.dataset.toggleFavorite);
      return;
    }

    const weeklySelectButton = event.target.closest("[data-select-weekly-song]");
    if (weeklySelectButton) {
      addSongToWeeklySelections(weeklySelectButton.dataset.selectWeeklySong);
      return;
    }

    const shareButton = event.target.closest("[data-share-song]");

    if (!shareButton) {
      return;
    }

    shareSongToWhatsApp(shareButton.dataset.shareSong);
  });

  elements.lyricsModal.addEventListener("click", (event) => {
    if (event.target.closest("[data-close-lyrics]")) {
      closeLyricsModal();
    }
  });

  elements.openAdminButton.addEventListener("click", async () => {
    await openAdminModal("create");
  });

  elements.openUsersButton?.addEventListener("click", async () => {
    await openAdminModal("users");
  });

  elements.openAssetsButton.addEventListener("click", async () => {
    await openAdminModal("assets");
  });

  elements.memberLogoutButton?.addEventListener("click", () => {
    if (isAdminUser()) {
      signOutCloudAdmin();
    } else {
      signOutMember();
    }
    renderAll();
    setFlash("Sessao encerrada com sucesso.", "success");
  });

  elements.memberLoginForm?.addEventListener("submit", async (event) => {
    await handleAccessLoginSubmit(event);
  });

  elements.adminModal.addEventListener("click", async (event) => {
    const shouldClose = event.target.closest("[data-close-admin]");
    if (shouldClose) {
      closeAdminModal();
      return;
    }

    const migrateButton = event.target.closest("[data-migrate-local-catalog]");
    if (migrateButton) {
      await migrateLocalCatalogToCloud();
      return;
    }

    const restoreSeedCatalogButton = event.target.closest("[data-restore-seed-catalog]");
    if (restoreSeedCatalogButton) {
      await restoreSeedCatalog();
      return;
    }

    const openCoverBatchButton = event.target.closest("[data-open-cover-batch]");
    if (openCoverBatchButton) {
      elements.coverBatchInput?.click();
      return;
    }

    const clearAllCoversButton = event.target.closest("[data-clear-all-covers]");
    if (clearAllCoversButton) {
      await clearAllSongCovers();
      return;
    }

    const resetCloudCatalogButton = event.target.closest("[data-reset-cloud-catalog]");
    if (resetCloudCatalogButton) {
      await resetCloudCatalogFromScratch();
      return;
    }

    const clearFormButton = event.target.closest("[data-clear-song-form]");
    if (clearFormButton) {
      resetSongForm();
      return;
    }

    const editButton = event.target.closest("[data-edit-song]");
    if (editButton) {
      startEditingSong(editButton.dataset.editSong);
      return;
    }

    const deleteButton = event.target.closest("[data-delete-song]");
    if (deleteButton) {
      await deleteSong(deleteButton.dataset.deleteSong);
      return;
    }

    const removeCoverButton = event.target.closest("[data-remove-cover]");
    if (removeCoverButton) {
      setAdminCoverDraft("");
      updateAdminCoverPreview();
      setFlash("Capa removida do cadastro.", "success");
      return;
    }

    const signOutButton = event.target.closest("[data-cloud-signout]");
    if (signOutButton) {
      try {
        await signOutCloudAdmin();
        state.editingSongId = null;
        resetAdminCoverDraft();
        renderAll();
        setFlash("Saida do cadastro realizada com sucesso.", "success");
      } catch (error) {
        console.error("Falha ao sair do cadastro.", error);
        setFlash("Nao consegui sair do cadastro agora.", "error");
      }

      return;
    }

    const deleteMemberButton = event.target.closest("[data-delete-member]");
    if (deleteMemberButton) {
      await handleDeleteMember(deleteMemberButton.dataset.deleteMember);
    }
  });

  elements.adminModal.addEventListener("submit", async (event) => {
    if (event.target.id === "cloud-admin-login-form") {
      await handleCloudAdminLoginSubmit(event);
      return;
    }

    if (event.target.id === "admin-song-form") {
      event.preventDefault();
      await saveSongFromForm(new FormData(event.target));
      return;
    }

    if (event.target.id === "rotation-settings-form") {
      await handleRotationSettingsSubmit(event);
      return;
    }

    if (event.target.id === "member-access-form") {
      await handleMemberAccessSubmit(event);
    }
  });

  elements.coverBatchInput?.addEventListener("change", async (event) => {
    await handleBatchCoverFiles(event.target.files);
  });

  elements.adminModal.addEventListener("input", (event) => {
    if (event.target.id === "admin-song-filter") {
      state.adminFilter = preserveInputText(event.target.value);
      renderAdminSongList();
      return;
    }

    if (["song-title", "song-artist"].includes(event.target.id)) {
      updateAdminCoverPreview();
    }
  });

  elements.adminModal.addEventListener("change", async (event) => {
    if (event.target.name === "asset-producer") {
      setAdminProducerFilter(event.target.value);
      state.editingSongId = null;
      state.adminFilter = "";
      resetAdminCoverDraft();
      renderAdminDashboardView();
      return;
    }

    if (event.target.id === "song-cover-file") {
      const [file] = event.target.files || [];
      await handleAdminCoverFileChange(file);
    }
  });

  document.addEventListener("error", (event) => {
    const image = event.target;

    if (!(image instanceof HTMLImageElement) || !image.dataset.fallbackText) {
      return;
    }

    const coverShell = image.closest(".cover-shell");
    if (!coverShell || coverShell.classList.contains("is-placeholder")) {
      return;
    }

    coverShell.classList.add("is-placeholder");
    coverShell.innerHTML = `<span>${escapeHtml(image.dataset.fallbackText)}</span>`;
  }, true);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !elements.adminModal.classList.contains("is-hidden")) {
      closeAdminModal();
      return;
    }

    if (event.key === "Escape" && !elements.lyricsModal.classList.contains("is-hidden")) {
      closeLyricsModal();
    }
  });

  window.addEventListener("hashchange", () => {
    state.activeProducer = getInitialProducer();
    renderAll();
  });

  window.addEventListener("focus", () => {
    refreshCloudState({ quiet: true });
  });

  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) {
      refreshCloudState({ quiet: true });
    }
  });
}

async function init() {
  registerServiceWorker();
  loadAdminState();
  state.catalog = loadLocalCatalogSnapshot();
  await loadCoverAssetsFromDb();
  await migrateEmbeddedCoversToIndexedDb();
  loadPreferences();
  bindEvents();
  renderAll();
  await loadCatalog();
  renderAll();

  if (!cloudRefreshTimerId) {
    cloudRefreshTimerId = window.setInterval(() => {
      if (!document.hidden) {
        refreshCloudState({ quiet: true });
      }
    }, 20000);
  }
}

init().catch((error) => {
  console.error("Falha ao iniciar o app.", error);
});
