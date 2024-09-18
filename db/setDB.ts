import { BooksDataType } from '@/utils/interfaces';
import { database } from '../firebase/firebaseDBConfig';
import { ref, set } from "firebase/database";


const booksData: BooksDataType[] = [
    {
        id: 0,
        title: 'Mindset: A nova psicologia do sucesso',
        genre: ['mindset', 'self-development'],
        author: 'Carol S. Dweck',
        imageUrl: 'https://m.media-amazon.com/images/I/71Ils+Co9fL._SL1500_.jpg',
        linkToBuy: 'https://www.amazon.com.br/Mindset-Carol-S-Dweck/dp/8547000240/ref=pd_sbs_d_sccl_3_11/133-2149500-7288322?pd_rd_w=bt0Ri&content-id=amzn1.sym.68326368-ff9d-4049-9e0b-966eebe5b24e&pf_rd_p=68326368-ff9d-4049-9e0b-966eebe5b24e&pf_rd_r=9V7E182P4F77411BKQSZ&pd_rd_wg=oecO5&pd_rd_r=5ade0d24-4865-487d-8f7f-fd8317766a99&pd_rd_i=8547000240&psc=1',
        rating: '4.7'
      },
      {
        id: 1,
        title: 'Think and grow rich',
        genre: ['finance', 'mindset', 'self-development'],
        author: 'Napolean Hill',
        imageUrl: 'https://m.media-amazon.com/images/I/81hR3x8mwZL._SL1500_.jpg',
        linkToBuy: 'https://www.amazon.com.br/Think-Grow-Rich-Publication-Foundation/dp/193787950X/ref=sr_1_12?crid=3I5NAC7UBZHOK&dib=eyJ2IjoiMSJ9.0-uGDU0Gy19b2T98cc0u1TglGbdytasZ4ZIPFiVzAJKkaCtjY3w4FeGjwV1lT1OlgIIF65ssYuYC0CE4oZF0d13uj3gHSQAc6NHuzcwObA2VHs5NgoDhlOE5dETgk4xMHgVbqyZWYeXOvq-15JW1Hqhhe_XYLvgmbuqB8wFkzRZ4n-kXHAX_FvqMkr5Xw6ErSK7KuFKE5OEjVfyjbjg8FAUBjAqVg7u-LBJ9t_cFK-iDfLBN9pyUQLDnv6gPaqGYUyJtirt7GdJMPhX-F5CLtMSf6sT216PHIjSWZ7v1cT0.CfO3Rc70DKdWLI5R5mg2MQmRQEXTfDCIgThDSGKww6Q&dib_tag=se&keywords=think+and+grow+rich&qid=1726139825&sprefix=think+%2Caps%2C328&sr=8-12&ufe=app_do%3Aamzn1.fos.6a09f7ec-d911-4889-ad70-de8dd83c8a74',
        rating: '4.8'
      },
      {
        id: 2,
        title: 'Rich Dad poor Dad',
        genre: ['finance', 'mindset', 'self-development'],
        author: 'Robert T. Kiyosaki',
        imageUrl: 'https://m.media-amazon.com/images/I/81BE7eeKzAL._SL1500_.jpg',
        linkToBuy: 'https://www.amazon.com.br/Rich-Dad-Poor-Teach-Middle/dp/1612681123/ref=pd_sim_d_sccl_3_6/133-2149500-7288322?pd_rd_w=LMsW7&content-id=amzn1.sym.8555f615-361b-42f7-96c4-206bb8a5174e&pf_rd_p=8555f615-361b-42f7-96c4-206bb8a5174e&pf_rd_r=WDQMEFT9J23K7NNQZB20&pd_rd_wg=cQMwb&pd_rd_r=8952fdc5-82cc-4490-97b3-8f9bd8037e03&pd_rd_i=1612681123&psc=1',
        rating: '4.7'
      },
      {
        id: 3,
        title: 'Arrume a sua cama',
        genre: ['mindset', 'self-development'],
        author: 'William H. McRaven',
        imageUrl: 'https://m.media-amazon.com/images/I/81C7jAnjS3L._SL1500_.jpg',
        linkToBuy: 'https://www.amazon.com.br/dp/8542215788/ref=sspa_dk_detail_3?psc=1&pd_rd_i=8542215788&pd_rd_w=Kik49&content-id=amzn1.sym.1868afab-d777-4b70-8899-1b323ad91d95&pf_rd_p=1868afab-d777-4b70-8899-1b323ad91d95&pf_rd_r=WEWY37CR0ZK46HDPW7F9&pd_rd_wg=TsEqO&pd_rd_r=1b9156b9-400c-415c-87a5-db230550a06f&s=books&sp_csd=d2lkZ2V0TmFtZT1zcF9kZXRhaWw',
        rating: '4.5'
      },
      {
        id: 4,
        title: 'Os segredos da mente milionária',
        genre: ['finance', 'mindset', 'self-development'],
        author: 'T. Harv Eker',
        imageUrl: 'https://m.media-amazon.com/images/I/81WzW3xJb5L._SL1500_.jpg',
        linkToBuy: 'https://www.amazon.com.br/segredos-mente-milion%C3%A1ria-Harv-Eker/dp/8575422391/ref=pd_bxgy_d_sccl_1/133-2149500-7288322?pd_rd_w=sO8EM&content-id=amzn1.sym.e6bad1fb-0cdf-4b12-ab23-306fa1339c43&pf_rd_p=e6bad1fb-0cdf-4b12-ab23-306fa1339c43&pf_rd_r=SK223Y1BBY951REE5Z6M&pd_rd_wg=UOUba&pd_rd_r=24c5d5f6-5c8c-4976-b06c-515b9256e135&pd_rd_i=8575422391&psc=1',
        rating: '4.7'
      },
      {
        id: 5,
        title: 'O homem mais rico da Babilônia',
        genre: ['finance', 'mindset', 'self-development'],
        author: 'George S. Clason',
        imageUrl: 'https://m.media-amazon.com/images/I/81ehX6Quw2L._SL1500_.jpg',
        linkToBuy: 'https://www.amazon.com.br/Homem-Mais-Rico-Babil%C3%B4nia/dp/8595081530/ref=pd_bxgy_thbs_d_sccl_2/133-2149500-7288322?pd_rd_w=sO8EM&content-id=amzn1.sym.e6bad1fb-0cdf-4b12-ab23-306fa1339c43&pf_rd_p=e6bad1fb-0cdf-4b12-ab23-306fa1339c43&pf_rd_r=SK223Y1BBY951REE5Z6M&pd_rd_wg=UOUba&pd_rd_r=24c5d5f6-5c8c-4976-b06c-515b9256e135&pd_rd_i=8595081530&psc=1',
        rating: '4.9'
      },
      {
        id: 6,
        title: 'Hábitos Atômicos',
        genre: ['mindset', 'self-development'],
        author: 'James Clear',
        imageUrl: 'https://m.media-amazon.com/images/I/81eT2pjx4jL._SL1500_.jpg',
        linkToBuy: 'https://www.amazon.com.br/dp/8550807567/ref=sspa_dk_detail_2?psc=1&pd_rd_i=8550807567&pd_rd_w=neMqG&content-id=amzn1.sym.1868afab-d777-4b70-8899-1b323ad91d95&pf_rd_p=1868afab-d777-4b70-8899-1b323ad91d95&pf_rd_r=SK223Y1BBY951REE5Z6M&pd_rd_wg=UOUba&pd_rd_r=24c5d5f6-5c8c-4976-b06c-515b9256e135&s=books&sp_csd=d2lkZ2V0TmFtZT1zcF9kZXRhaWw',
        rating: '4.8'
      },
      {
        id: 7,
        title: 'Mais esperto que o Diabo',
        genre: ['finance', 'mindset', 'self-development'],
        author: 'Napolean Hill',
        imageUrl: 'https://m.media-amazon.com/images/I/819ERrDHRcL._SL1500_.jpg',
        linkToBuy: 'https://www.amazon.com.br/dp/8568014003/ref=sspa_dk_detail_11?psc=1&pf_rd_p=1868afab-d777-4b70-8899-1b323ad91d95&pf_rd_r=ZKRVXRHETZ7BEBVMNSXX&pd_rd_wg=PjRtM&pd_rd_w=UOA2v&content-id=amzn1.sym.1868afab-d777-4b70-8899-1b323ad91d95&pd_rd_r=374eb3ae-7049-42ff-8f9c-e74fc7844e58&s=books&sp_csd=d2lkZ2V0TmFtZT1zcF9kZXRhaWw',
        rating: '4.7'
      },
      {
        id: 8,
        title: 'Do Mil ao Milhão. Sem Cortar o Cafezinho',
        genre: ['finance', 'mindset'],
        author: 'Thiago Nigro',
        imageUrl: 'https://m.media-amazon.com/images/I/81r5VTxaBiL._SL1500_.jpg',
        linkToBuy: 'https://www.amazon.com.br/Mil-Milh%C3%A3o-Sem-Cortar-Cafezinho/dp/8595083274/ref=pd_sim_d_sccl_3_8/133-2149500-7288322?pd_rd_w=5cffi&content-id=amzn1.sym.8555f615-361b-42f7-96c4-206bb8a5174e&pf_rd_p=8555f615-361b-42f7-96c4-206bb8a5174e&pf_rd_r=0K2N424C1YNV6VQ1R3SY&pd_rd_wg=uDaGh&pd_rd_r=776d2439-95c9-471a-9835-1731ddae215c&pd_rd_i=8595083274&psc=1',
        rating: '4.7'
      },
      {
        id: 9,
        title: 'Ayrton: o Herói Revelado',
        genre: ['biography', 'mindset'],
        author: 'Ernesto Rodrigues',
        imageUrl: 'https://m.media-amazon.com/images/I/615c3rVH5ML._SL1437_.jpg',
        linkToBuy: 'https://www.amazon.com.br/Mil-Milh%C3%A3o-Sem-Cortar-Cafezinho/dp/8595083274/ref=pd_sim_d_sccl_3_8/133-2149500-7288322?pd_rd_w=5cffi&content-id=amzn1.sym.8555f615-361b-42f7-96c4-206bb8a5174e&pf_rd_p=8555f615-361b-42f7-96c4-206bb8a5174e&pf_rd_r=0K2N424C1YNV6VQ1R3SY&pd_rd_wg=uDaGh&pd_rd_r=776d2439-95c9-471a-9835-1731ddae215c&pd_rd_i=8595083274&psc=1',
        rating: '4.8'
      },
      {
        id: 10,
        title: 'O poder do hábito',
        genre: ['self-development', 'mindset', 'scientific'],
        author: 'Charles Duhigg',
        imageUrl: 'https://m.media-amazon.com/images/I/815iPX0SgkL._SL1500_.jpg',
        linkToBuy: 'https://www.amazon.com.br/poder-do-h%C3%A1bito-Charles-Duhigg/dp/8539004119/ref=pd_sim_d_sccl_3_16/133-2149500-7288322?pd_rd_w=26ItA&content-id=amzn1.sym.8555f615-361b-42f7-96c4-206bb8a5174e&pf_rd_p=8555f615-361b-42f7-96c4-206bb8a5174e&pf_rd_r=BQM9CDTZW0N96BDAE39B&pd_rd_wg=Jk8q8&pd_rd_r=d1755445-3854-4777-8c19-b24194f40301&pd_rd_i=8539004119&psc=1',
        rating: '4.7'
      },
      {
        id: 11,
        title: 'Como fazer amigos e influenciar pessoas',
        genre: ['self-development', 'mindset', 'communication'],
        author: 'Dale Carnegie',
        imageUrl: 'https://m.media-amazon.com/images/I/71TFUTvPncL._SL1500_.jpg',
        linkToBuy: 'https://www.amazon.com.br/Como-fazer-amigos-influenciar-pessoas/dp/8543108683/ref=pd_sim_d_sccl_3_3/133-2149500-7288322?pd_rd_w=GRDGC&content-id=amzn1.sym.8555f615-361b-42f7-96c4-206bb8a5174e&pf_rd_p=8555f615-361b-42f7-96c4-206bb8a5174e&pf_rd_r=M2KQ4FSTQW83043V6FBC&pd_rd_wg=vlOcV&pd_rd_r=7f1d4407-002c-477d-8ad3-99a5c870bcd6&pd_rd_i=8543108683&psc=1',
        rating: '4.8'
      },
      {
        id: 12,
        title: 'Storytelling: Aprenda a Contar Histórias com Steve Jobs, Papa Francisco, Churchill e Outras Lendas da Liderança',
        genre: ['self-development', 'mindset', 'communication'],
        author: 'Carmine Gallo',
        imageUrl: 'https://m.media-amazon.com/images/I/81SYp6w0P-L._SL1500_.jpg',
        linkToBuy: 'https://www.amazon.com.br/dp/8550810258/ref=sspa_dk_detail_4?psc=1&pf_rd_p=1868afab-d777-4b70-8899-1b323ad91d95&pf_rd_r=7P4RPNFFNA5HS8G3EEC6&pd_rd_wg=VhHMt&pd_rd_w=eJenm&content-id=amzn1.sym.1868afab-d777-4b70-8899-1b323ad91d95&pd_rd_r=820d4ae7-086e-4ae9-ac4a-df211aeee146&s=books&sp_csd=d2lkZ2V0TmFtZT1zcF9kZXRhaWw',
        rating: '4.7'
      },
      {
        id: 13,
        title: 'Como convencer alguém em 90 segundos',
        genre: ['self-development', 'mindset', 'communication'],
        author: 'Nicholas Boothman',
        imageUrl: 'https://m.media-amazon.com/images/I/81n0U7HAfVL._SL1500_.jpg',
        linkToBuy: 'https://www.amazon.com.br/Como-Convencer-Algu%C3%A9m-Em-Segundos/dp/8579303192/ref=pd_sim_d_sccl_3_12/133-2149500-7288322?pd_rd_w=1jAHh&content-id=amzn1.sym.8555f615-361b-42f7-96c4-206bb8a5174e&pf_rd_p=8555f615-361b-42f7-96c4-206bb8a5174e&pf_rd_r=JMVZCCQZ95YSYZ1BHE1T&pd_rd_wg=4BTgw&pd_rd_r=2db20299-a7c2-44b4-8f56-24d793188293&pd_rd_i=8579303192&psc=1',
        rating: '4.7'
      },
      {
        id: 14,
        title: 'Essencialismo: A disciplinada busca por menos',
        genre: ['self-development', 'mindset'],
        author: 'Greg McKeown',
        imageUrl: 'https://m.media-amazon.com/images/I/71HuZRl-XeL._SL1500_.jpg',
        linkToBuy: 'https://www.amazon.com.br/Essencialismo-Greg-Mckeown/dp/8543102146/ref=pd_sim_d_sccl_3_4/133-2149500-7288322?pd_rd_w=GRDGC&content-id=amzn1.sym.8555f615-361b-42f7-96c4-206bb8a5174e&pf_rd_p=8555f615-361b-42f7-96c4-206bb8a5174e&pf_rd_r=M2KQ4FSTQW83043V6FBC&pd_rd_wg=vlOcV&pd_rd_r=7f1d4407-002c-477d-8ad3-99a5c870bcd6&pd_rd_i=8543102146&psc=1',
        rating: '4.8'
      },
      {
        id: 15,
        title: "Por que fazemos o que fazemos?",
        genre: ["self-development", "mindset"],
        author: "Mario Sergio Cortella",
        imageUrl: "https://m.media-amazon.com/images/I/81lAsq3XIjL._SL1500_.jpg",
        linkToBuy: "https://www.amazon.com.br/dp/8542207416/ref=sspa_dk_detail_3?psc=1&pd_rd_i=8542207416&pd_rd_w=qsl2t&content-id=amzn1.sym.1868afab-d777-4b70-8899-1b323ad91d95&pf_rd_p=1868afab-d777-4b70-8899-1b323ad91d95&pf_rd_r=WBCJPEGBA9CZD4PY1ZXV&pd_rd_wg=QSsRG&pd_rd_r=e0a40a7f-436b-42fd-8073-538d876614b1&s=books&sp_csd=d2lkZ2V0TmFtZT1zcF9kZXRhaWw",
        rating: "4.6"
      },
      {
        id: 16,
        title: "Nação dopamina",
        genre: ["self-development", "mindset", "scientific"],
        author: "Dra. Anna Lembke",
        imageUrl: "https://m.media-amazon.com/images/I/91l+hrxcPhL._SL1500_.jpg",
        linkToBuy: "https://www.amazon.com.br/Na%C3%A7%C3%A3o-dopamina-excesso-deixando-infelizes/dp/6586551714/ref=pd_sim_d_sccl_3_17/133-2149500-7288322?pd_rd_w=GRDGC&content-id=amzn1.sym.8555f615-361b-42f7-96c4-206bb8a5174e&pf_rd_p=8555f615-361b-42f7-96c4-206bb8a5174e&pf_rd_r=M2KQ4FSTQW83043V6FBC&pd_rd_wg=vlOcV&pd_rd_r=7f1d4407-002c-477d-8ad3-99a5c870bcd6&pd_rd_i=6586551714&sc=1",        
        rating: "4.7"
      },
      {
        id: 17,
        title: "12 Regras Para a Vida",
        genre: ["self-development", "mindset"],
        author: "Jordan B. Peterson",
        imageUrl: "https://m.media-amazon.com/images/I/51DSFiydE-L._SL1000_.jpg",
        linkToBuy: "https://www.amazon.com.br/dp/8550802751/ref=sspa_dk_detail_6?psc=1&pd_rd_i=8550802751&pd_rd_w=BiOS6&content-id=amzn1.sym.1868afab-d777-4b70-8899-1b323ad91d95&pf_rd_p=1868afab-d777-4b70-8899-1b323ad91d95&pf_rd_r=3ETKKWK99F0PV7E644Y5&pd_rd_wg=51jMV&pd_rd_r=400a308b-2377-4045-9f50-286453bee96e&s=books&sp_csd=d2lkZ2V0TmFtZT1zcF9kZXRhaWw",
        rating: "4.8"
      },
      {
        id: 18,
        title: "O ego é seu inimigo",
        genre: ["self-development", "mindset"],
        author: "Ryan Holiday",
        imageUrl: "https://m.media-amazon.com/images/I/61wr4eRbOUL._SL1000_.jpg",
        linkToBuy: "https://www.amazon.com.br/ego-seu-inimigo-dominar-advers%C3%A1rio/dp/8551002422/ref=pd_sim_d_sccl_3_5/133-2149500-7288322?pd_rd_w=ltd95&content-id=amzn1.sym.8555f615-361b-42f7-96c4-206bb8a5174e&pf_rd_p=8555f615-361b-42f7-96c4-206bb8a5174e&pf_rd_r=ABYMHH0VMBM7T7S8KNGS&pd_rd_wg=21cMJ&pd_rd_r=b8b50af5-0c24-4cc9-942a-4ec11e6db8a7&pd_rd_i=8551002422&sc=1",        
        rating: "4.7"
      },
      {
        id: 19,
        title: "As 48 leis do poder",
        genre: ["self-development", "mindset"],
        author: "Talita M. Rodrigues",
        imageUrl: "https://m.media-amazon.com/images/I/71dLhjUgN5L._SL1500_.jpg",
        linkToBuy: "https://www.amazon.com.br/As-48-leis-poder-concisa/dp/6555323604/ref=pd_sim_d_sccl_3_13/133-2149500-7288322?pd_rd_w=GRDGC&content-id=amzn1.sym.8555f615-361b-42f7-96c4-206bb8a5174e&pf_rd_p=8555f615-361b-42f7-96c4-206bb8a5174e&pf_rd_r=M2KQ4FSTQW83043V6FBC&pd_rd_wg=vlOcV&pd_rd_r=7f1d4407-002c-477d-8ad3-99a5c870bcd6&pd_rd_i=6555323604&psc=1",
        rating: "4.7"
      },
      {
        id: 20,
        title: "Antifrágil",
        genre: ["self-development", "mindset"],
        author: "Nassim Nicholas Taleb",
        imageUrl: "https://m.media-amazon.com/images/I/8119xmkJ3IL._SL1500_.jpg",
        linkToBuy: "https://www.amazon.com.br/Antifr%C3%A1gil-Nova-edi%C3%A7%C3%A3o-Coisas-beneficiam/dp/8547001085/ref=pd_sim_d_sccl_3_20/133-2149500-7288322?pd_rd_w=GRDGC&content-id=amzn1.sym.8555f615-361b-42f7-96c4-206bb8a5174e&pf_rd_p=8555f615-361b-42f7-96c4-206bb8a5174e&pf_rd_r=M2KQ4FSTQW83043V6FBC&pd_rd_wg=vlOcV&pd_rd_r=7f1d4407-002c-477d-8ad3-99a5c870bcd6&pd_rd_i=8547001085&sc=1",        
        rating: "4.7"
      },
      {
        id: 21,
        title: "A lógica do Cisne Negro",
        genre: ["self-development", "mindset"],
        author: "Nassim Nicholas Taleb",
        imageUrl: "https://m.media-amazon.com/images/I/714RNYWLXIS._SL1500_.jpg",
        linkToBuy: "https://www.amazon.com.br/l%C3%B3gica-Cisne-Edi%C3%A7%C3%A3o-revista-ampliada/dp/8547001263/ref=pd_bxgy_thbs_d_sccl_1/133-2149500-7288322?pd_rd_w=4OJgl&content-id=amzn1.sym.e6bad1fb-0cdf-4b12-ab23-306fa1339c43&pf_rd_p=e6bad1fb-0cdf-4b12-ab23-306fa1339c43&pf_rd_r=S4YBEEFFXK79J1W71AAJ&pd_rd_wg=GVE2t&pd_rd_r=39d8e91e-e221-4313-a0d4-bdd4ade44af0&pd_rd_i=8547001263&sc=1",        
        rating: "4.7"
      },
      {
        id: 22,
        title: 'Ruído: Uma falha no julgamento humano',
        genre: ['self-development', 'mindset'],
        author: 'Daniel Kahneman, Olivier Sibony, Cass R. Sunstein',
        imageUrl: 'https://m.media-amazon.com/images/I/81I6rfFOM-S._SL1500_.jpg',
        linkToBuy: 'https://www.amazon.com.br/Ru%C3%ADdo-Uma-falha-julgamento-humano/dp/8547001336/ref=pd_sim_d_sccl_2_6/133-2149500-7288322?pd_rd_w=P5Wrb&content-id=amzn1.sym.8555f615-361b-42f7-96c4-206bb8a5174e&pf_rd_p=8555f615-361b-42f7-96c4-206bb8a5174e&pf_rd_r=7EBF18C1G1WTA87PVFTV&pd_rd_wg=6cbIu&pd_rd_r=b7d0d728-9ffc-46b8-8d8c-00c7495d5197&pd_rd_i=8547001336&psc=1',
        rating: '4.6'
      },
      {
        id: 23,
        title: 'Rápido e devagar: Duas formas de pensar',
        genre: ['self-development', 'mindset'],
        author: 'Daniel Kahneman',
        imageUrl: 'https://m.media-amazon.com/images/I/61pt9lG-PvL._SL1500_.jpg',
        linkToBuy: 'https://www.amazon.com.br/R%C3%A1pido-devagar-Daniel-Kahneman/dp/853900383X/ref=pd_bxgy_thbs_d_sccl_2/133-2149500-7288322?pd_rd_w=4OJgl&content-id=amzn1.sym.e6bad1fb-0cdf-4b12-ab23-306fa1339c43&pf_rd_p=e6bad1fb-0cdf-4b12-ab23-306fa1339c43&pf_rd_r=S4YBEEFFXK79J1W71AAJ&pd_rd_wg=GVE2t&pd_rd_r=39d8e91e-e221-4313-a0d4-bdd4ade44af0&pd_rd_i=853900383X&psc=1',
        rating: '4.7'
      },
      {
        id: 24,
        title: 'Sapiens: Uma breve história da humanidade',
        genre: ['self-development', 'mindset'],
        author: 'Yuval Noah Harari',
        imageUrl: 'https://m.media-amazon.com/images/I/71-ghLb8qML._SL1500_.jpg',
        linkToBuy: 'https://www.amazon.com.br/Sapiens-Nova-edi%C3%A7%C3%A3o-hist%C3%B3ria-humanidade/dp/8535933921/ref=pd_sim_d_sccl_3_15/133-2149500-7288322?pd_rd_w=kptzE&content-id=amzn1.sym.8555f615-361b-42f7-96c4-206bb8a5174e&pf_rd_p=8555f615-361b-42f7-96c4-206bb8a5174e&pf_rd_r=2BCKFET92J52XJ4DABAV&pd_rd_wg=CVOJp&pd_rd_r=dc7fca73-7fe6-44bd-be1b-dbc47e133c95&pd_rd_i=8535933921&psc=1',
        rating: '4.8'
      },
      {
        id: 25,
        title: 'Como falar em público e encantar as pessoas',
        genre: ['self-development', 'mindset'],
        author: 'Dale Carnegie',
        imageUrl: 'https://m.media-amazon.com/images/I/71TFUTvPncL._SL1500_.jpg',
        linkToBuy: 'https://www.amazon.com.br/Como-falar-p%C3%BAblico-encantar-pessoas/dp/6555640766/ref=pd_sim_d_sccl_3_27/133-2149500-7288322?pd_rd_w=GRDGC&content-id=amzn1.sym.8555f615-361b-42f7-96c4-206bb8a5174e&pf_rd_p=8555f615-361b-42f7-96c4-206bb8a5174e&pf_rd_r=M2KQ4FSTQW83043V6FBC&pd_rd_wg=vlOcV&pd_rd_r=7f1d4407-002c-477d-8ad3-99a5c870bcd6&pd_rd_i=6555640766&psc=1',
        rating: '4.7'
      },
      {
        id: 26,
        title: 'Trabalhe 4 horas por semana',
        genre: ['self-development', 'mindset'],
        author: 'Timothy Ferriss',
        imageUrl: 'https://m.media-amazon.com/images/I/81nUthzU+xL._SL1500_.jpg',
        linkToBuy: 'https://www.amazon.com.br/Trabalhe-4-Horas-por-Semana/dp/8542211561/ref=pd_sim_d_sccl_3_26/133-2149500-7288322?pd_rd_w=GRDGC&content-id=amzn1.sym.8555f615-361b-42f7-96c4-206bb8a5174e&pf_rd_p=8555f615-361b-42f7-96c4-206bb8a5174e&pf_rd_r=M2KQ4FSTQW83043V6FBC&pd_rd_wg=vlOcV&pd_rd_r=7f1d4407-002c-477d-8ad3-99a5c870bcd6&pd_rd_i=8542211561&psc=1',
        rating: '4.6'
      },
      {
        id: 27,
        title: 'Os 7 Hábitos das Pessoas Altamente Eficazes',
        genre: ['self-development', 'mindset'],
        author: 'Stephen R. Covey',
        imageUrl: 'https://m.media-amazon.com/images/I/811jUvTg4FL._SL1500_.jpg',
        linkToBuy: 'https://www.amazon.com.br/H%C3%A1bitos-das-Pessoas-Altamente-Eficazes/dp/8576840626/ref=pd_sim_d_sccl_3_6/133-2149500-7288322?pd_rd_w=wNEbR&content-id=amzn1.sym.8555f615-361b-42f7-96c4-206bb8a5174e&pf_rd_p=8555f615-361b-42f7-96c4-206bb8a5174e&pf_rd_r=XGY3RBP2Y95F6620T5CT&pd_rd_wg=dUhNq&pd_rd_r=52d90402-552e-4f5b-b5ad-3b1152802ec3&pd_rd_i=8576840626&psc=1',
        rating: '4.8'
      },
      {
        id: 28,
        title: 'Storybrand',
        genre: ['mindset', 'marketing'],
        author: 'Stephen R. Covey',
        imageUrl: 'https://m.media-amazon.com/images/I/71XYY5h8GwL._SL1500_.jpg',
        linkToBuy: 'https://www.amazon.com.br/dp/8550804592/ref=sspa_dk_detail_2?psc=1&pd_rd_i=8550804592&pd_rd_w=VneRo&content-id=amzn1.sym.1868afab-d777-4b70-8899-1b323ad91d95&pf_rd_p=1868afab-d777-4b70-8899-1b323ad91d95&pf_rd_r=1CK3570C6NXCW8BN71J3&pd_rd_wg=0KXLg&pd_rd_r=9d9a1f42-e53f-4311-81e8-6e961af5fbb4&s=books&sp_csd=d2lkZ2V0TmFtZT1zcF9kZXRhaWw',
        rating: '4.8'
      },
      {
        id: 29,
        title: "O poder do subconsciente",
        genre: ["mindset", "marketing"],
        author: "Joseph Murphy",
        imageUrl: "https://m.media-amazon.com/images/I/91kLesOuQwL._SL1500_.jpg",
        linkToBuy: "https://www.amazon.com.br/poder-do-subconsciente-Joseph-Murphy/dp/8546501459/ref=pd_sim_d_sccl_2_35/133-2149500-7288322?pd_rd_w=NQ4Wt&content-id=amzn1.sym.8555f615-361b-42f7-96c4-206bb8a5174e&pf_rd_p=8555f615-361b-42f7-96c4-206bb8a5174e&pf_rd_r=H8DHSCDWRWRZ4K6JJWJW&pd_rd_wg=LqOqL&pd_rd_r=6e3e109f-5fb9-427f-92cc-8629053ed7ff&pd_rd_i=8546501459&psc=1",
        rating: "4.8"
    },
    {
        id: 30,
        title: "Foco: O poder da única coisa",
        genre: ["mindset", "self-development"],
        author: "Vinícius Almeida",
        imageUrl: "https://m.media-amazon.com/images/I/71ZMKelZ-WL._SL1500_.jpg",
        linkToBuy: "https://www.amazon.com.br/Foco-Encontre-prop%C3%B3sito-resultados-extraordin%C3%A1rios/dp/6555612037/ref=sr_1_3?crid=31MF8JRHVNY85&dib=eyJ2IjoiMSJ9.oFQyjMejULl0W9TYBtoSLk8StleIC6MP3V3vAYaQEpPallgePkkkQqgw1fdahXT2UHh52Ai7yGhXwVR6f5M0igQqiTIi26rzcCD5fxrNJrbiWts99_YGcFoADxKKkAq_d-GDuYf_A1570Dapfxs9qaixjndDteD7YNQdYXJEGObIbEoYCOgaB4-qRWjIaYA8gEQNzGDP9hrcobn6rpo8Z8nCuP5XDu6Ev7yofxSCKGs.Fm4wVSeqGZK074NNu2o8diCa4HWUYdK-OzEnccuOuYo&dib_tag=se&keywords=foco&qid=1726155171&=bookssprefix=foco%2Cstripbooks%2C373&sr=1-3",
        "rating": "4.7"
    },
    {
        id: 31,
        title: "Disciplina é Liberdade",
        genre: ["mindset", "self-development"],
        author: "Jocko Willink",
        imageUrl: "https://m.media-amazon.com/images/I/71GRMkxzbvL._SL1500_.jpg",
        linkToBuy: "https://www.amazon.com.br/dp/6555204869/ref=sspa_dk_detail_4?psc=1&pd_rd_i=6555204869&pd_rd_w=0TUSV&content-id=amzn1.sym.b0d855ab-21fd-49b1-ae3e-5a01e562f959&pf_rd_p=b0d855ab-21fd-49b1-ae3e-5a01e562f959&pf_rd_r=J84M1A0R6GPP3F74K0EZ&pd_rd_wg=8BUHq&pd_rd_r=9d923038-50b8-416e-ab6a-c766b44c2578&s=books&sp_csd=d2lkZ2V0TmFtZT1zcF9kZXRhaWwy",
        "rating": "4.4"
    },
    {
        id: 32,
        title: "O Codificador Limpo",
        genre: ["software-development"],
        author: "Jocko Willink",
        imageUrl: "https://m.media-amazon.com/images/I/91lBONZ4tAL._SL1500_.jpg",
        linkToBuy: "https://www.amazon.com.br/dp/8576086476/ref=sspa_dk_detail_5?psc=1&pf_rd_p=b0d855ab-21fd-49b1-ae3e-5a01e562f959&pf_rd_r=SQ4HQXXP2NEXCRTEG9SG&pd_rd_wg=Id7pD&pd_rd_w=sp6Ko&content-id=amzn1.sym.b0d855ab-21fd-49b1-ae3e-5a01e562f959&pd_rd_r=3ac51e0b-549f-4fc8-8777-feab9f9cc99d&s=books&sp_csd=d2lkZ2V0TmFtZT1zcF9kZXRhaWwy",
        "rating": "4.9"
    },
    {
        id: 33,
        title: "Código Limpo: Habilidades Práticas do Agile Software",
        genre: ["software-development"],
        author: "Robert C. Martin",
        imageUrl: "https://m.media-amazon.com/images/I/71dH97FwGbL._SL1500_.jpg",
        linkToBuy: "https://www.amazon.com.br/C%C3%B3digo-limpo-Robert-C-Martin/dp/8576082675/ref=pd_bxgy_thbs_d_sccl_1/133-2149500-7288322?pd_rd_w=RPewa&content-id=amzn1.sym.e6bad1fb-0cdf-4b12-ab23-306fa1339c43&pf_rd_p=e6bad1fb-0cdf-4b12-ab23-306fa1339c43&pf_rd_r=SK2PXE9QXB7SPH8RSG8Q&pd_rd_wg=9HNGb&pd_rd_r=647fe115-4e92-4577-bc47-5933b9236b6e&pd_rd_i=8576082675&psc=1",
        rating: "4.9"
    },
    {
        id: 34,
        title: "Arquitetura Limpa: o Guia do Artesão Para Estrutura e Design de Software",
        genre: ["software-development"],
        author: "Robert C. Martin",
        imageUrl: "https://m.media-amazon.com/images/I/815d9tE7jSL._SL1500_.jpg",
        linkToBuy: "https://www.amazon.com.br/Arquitetura-Limpa-Artes%C3%A3o-Estrutura-Software/dp/8550804606/ref=pd_bxgy_thbs_d_sccl_1/133-2149500-7288322?pd_rd_w=u5ZIb&content-id=amzn1.sym.e6bad1fb-0cdf-4b12-ab23-306fa1339c43&pf_rd_p=e6bad1fb-0cdf-4b12-ab23-306fa1339c43&pf_rd_r=P49142DDQG1HW8STQKGE&pd_rd_wg=yLNYJ&pd_rd_r=3357fef2-a558-49ae-8d22-9665e1204a68&pd_rd_i=8550804606&psc=1",
        rating: "4.9"
    },
    {
        id: 35,
        title: "Entendendo Algoritmos",
        genre: ["software-development"],
        author: "Aditya Y. Bhargava",
        imageUrl: "https://m.media-amazon.com/images/I/71Vkg7GfPFL._SL1296_.jpg",
        linkToBuy: "https://www.amazon.com.br/Entendendo-Algoritmos-Ilustrado-Programadores-Curiosos/dp/8575225634/ref=pd_sim_d_sccl_2_4/133-2149500-7288322?pd_rd_w=3KrjK&content-id=amzn1.sym.8555f615-361b-42f7-96c4-206bb8a5174e&pf_rd_p=8555f615-361b-42f7-96c4-206bb8a5174e&pf_rd_r=M32BCPC5MFN96DABS0YG&pd_rd_wg=tqeYm&pd_rd_r=5becc9a2-8bc9-4258-be75-3acdfd71b864&pd_rd_i=8575225634&psc=1",
        rating: "4.8"
    },
    {
        id: 36,
        "title": "Cracking the Coding Interview",
        "genre": ["software-development"],
        "author": "Gayle Laakmann McDowell",
        "imageUrl": "https://m.media-amazon.com/images/I/61mIq2iJUXL._SL1360_.jpg",
        "linkToBuy": "https://www.amazon.com.br/Cracking-Coding-Interview-Programming-Questions/dp/0984782850/ref=pd_sim_d_sccl_2_31/133-2149500-7288322?pd_rd_w=y8XM7&content-id=amzn1.sym.8555f615-361b-42f7-96c4-206bb8a5174e&pf_rd_p=8555f615-361b-42f7-96c4-206bb8a5174e&pf_rd_r=MNEK6EC8RV7GCQPQK8YS&pd_rd_wg=3Cj2M&pd_rd_r=a4dbb959-1b3c-48ea-b36d-d9d1d01505be&pd_rd_i=0984782850&psc=1",
        "rating": "4.7"
      },
      {
        id: 37,
        "title": "Designing Data-Intensive Applications",
        "genre": ["software-development"],
        "author": "Martin Kleppmann",
        "imageUrl": "https://m.media-amazon.com/images/I/91YfNb49PLL._SL1500_.jpg",
        "linkToBuy": "https://www.amazon.com.br/Designing-Data-Intensive-Applications-Martin-Kleppmann/dp/1449373321/ref=pd_sim_d_sccl_3_1/133-2149500-7288322?pd_rd_w=zssWG&content-id=amzn1.sym.8555f615-361b-42f7-96c4-206bb8a5174e&pf_rd_p=8555f615-361b-42f7-96c4-206bb8a5174e&pf_rd_r=GDKBQAFN9DRPM532ZF8M&pd_rd_wg=NHikV&pd_rd_r=75d75f19-b75c-45a2-870a-7e6bd2d50823&pd_rd_i=1449373321&psc=1",
        "rating": "4.8"
      },
      {
        id: 38,
        "title": "The Culture Map: Breaking Through the Invisible Boundaries of Global Business",
        "genre": ["culture", "business"],
        "author": "Erin Meyer",
        "imageUrl": "https://m.media-amazon.com/images/I/71ReFbLwF1L._SL1500_.jpg",
        "linkToBuy": "https://www.amazon.com.br/Culture-Map-Decoding-People-Cultures/dp/1610392760/ref=sr_1_2?__mk_pt_BR=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=37074SYL9Q0D&dib=eyJ2IjoiMSJ9.GwwFOQfxqZsr_w0Va-fbbrREQGyyjjUxGb3sgd-pzhwX-EEvLfbwqjNidwrDkhoDtQKE59kG_eKlBcmIYHChlyJUACC2Ow0uMKTZ5-0j6n62so8nuhRF_RuB_WN2Zao1P5VUSWVQsmRj-CRMMX5_74rE2IOxdATx8WQc38taMERd6tBNcK7MMy_paH4fFUSNH0A_DR0mMq6YrixOc5BSZcByl_yJzCFVo5hfdOybk9s.puNgRHDZRtaonVSIzmTtjEY18ojm73b9RtRFSTc25V0&dib_tag=se&keywords=cultural+map&qid=1726156464&s=books&sprefix=cultural+map%2Cstripbooks%2C240&sr=1-2&ufe=app_do%3Aamzn1.fos.a492fd4a-f54d-4e8d-8c31-35e0a04ce61e",
        "rating": "4.7"
      },
      {
        id: 39,
        "title": "Fluent Forever: How to Learn Any Language Fast and Never Forget It",
        "genre": ["languages"],
        "author": "Gabriel Wyner",
        "imageUrl": "https://m.media-amazon.com/images/I/611gisKfUpL._SY425_.jpg",
        "linkToBuy": "https://www.amazon.com.br/Fluent-Forever-Learn-Language-Forget/dp/0385348118/ref=sr_1_1?__mk_pt_BR=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=1POYJQQMP7Z94&dib=eyJ2IjoiMSJ9.GnHjRDLre5s5mX114tEl1v5B83nMVRcGvlX9VC6cIxuaTIicdkAlR5RszfsQNceLoNhPCwuOhiTySTmqCX86Y_6C0Q3VPogsZHbtccJ3Zv5yNnkdHNwxGe8cDKtuqo54JoFX0B0CxhyGLoJq_4GUeknrA8GbGTgwDbJBFlgAGVXkF9p3ecgLVIZzYQAQ4L0Z.N511JvyphoYz5mQYMUQ7aKKVDhSk8X_YZIdeCjE5grg&dib_tag=se&keywords=Fluent+Forever%3A+How+to+Learn+Any+Language+Fast+and+Never+Forget+It&qid=1726370900&sprefix=livros%2Caps%2C724&sr=8-1&ufe=app_do%3Aamzn1.fos.6d798eae-cadf-45de-946a-f477d47705b9",
        "rating": "4.5"
      },
      {
        id: 40,
        title: 'The Molecule of More',
        genre: ['scientific', 'self-development'],
        author: 'Daniel Z Lieberman, Michael E Long',
        imageUrl: 'https://m.media-amazon.com/images/I/71vvmeDZEeL._SL1500_.jpg',
        linkToBuy: 'https://www.amazon.com.br/Molecule-More-Chemical-Creativity_and-Determine/dp/1948836580/ref=pd_sbs_d_sccl_3_4/133-2149500-7288322?pd_rd_w=HwSZn&content-id=amzn1.sym.68326368-ff9d-4049-9e0b-966eebe5b24e&pf_rd_p=68326368-ff9d-4049-9e0b-966eebe5b24e&pf_rd_r=D9DT0PJPZBR2SA06FF4Q&pd_rd_wg=hKMtP&pd_rd_r=b4260b52-f0d4-49e3-985c-44bfa015646a&pd_rd_i=1948836580&psc=1',
        rating: '4.6'
      },
      {
        id: 41,
        title: 'Why We Sleep',
        genre: ['scientific', 'self-development'],
        author: 'Matthew Walker',
        imageUrl: 'https://m.media-amazon.com/images/I/71hYRUt1rNL._SL1500_.jpg',
        linkToBuy: 'https://www.amazon.com.br/Why-We-Sleep-Science-Dreams/dp/0141983760/ref=pd_sim_d_sccl_2_3/133-2149500-7288322?pd_rd_w=0DkqC&content-id=amzn1.sym.8555f615-361b-42f7-96c4-206bb8a5174e&pf_rd_p=8555f615-361b-42f7-96c4-206bb8a5174e&pf_rd_r=83JEA4V18NP9GB8RCT3W&pd_rd_wg=qcxpr&pd_rd_r=06e2e9fc-4964-49eb-8d54-5ca0c5a5d9b0&pd_rd_i=0141983760&psc=1',
        rating: '4.7'
      },
      {
        id: 42,
        title: 'Outlive: The Science and Art of Longevity',
        genre: ['scientific', 'self-development'],
        author: 'Peter Attia, Bill Gifford',
        imageUrl: 'https://m.media-amazon.com/images/I/71X9FMy66NL._SL1500_.jpg',
        linkToBuy: 'https://www.amazon.com.br/Outlive-Science-Longevity-Peter-Attia/dp/0593236599/ref=pd_sim_d_sccl_2_4/133-2149500-7288322?pd_rd_w=0DkqC&content-id=amzn1.sym.8555f615-361b-42f7-96c4-206bb8a5174e&pf_rd_p=8555f615-361b-42f7-96c4-206bb8a5174e&pf_rd_r=83JEA4V18NP9GB8RCT3W&pd_rd_wg=qcxpr&pd_rd_r=06e2e9fc-4964-49eb-8d54-5ca0c5a5d9b0&pd_rd_i=0593236599&psc=1',
        rating: '4.7'
      },
      {
        id: 43,
        title: 'The Creative Act: a way of being',
        genre: ['self-development'],
        author: 'Rick Rubin',
        imageUrl: 'https://m.media-amazon.com/images/I/71dUSlTVOwL._SL1500_.jpg',
        linkToBuy: 'https://www.amazon.com.br/Creative-Act-Way-Being/dp/1838858636/ref=pd_sim_d_sccl_2_18/133-2149500-7288322?pd_rd_w=82GxP&content-id=amzn1.sym.8555f615-361b-42f7-96c4-206bb8a5174e&pf_rd_p=8555f615-361b-42f7-96c4-206bb8a5174e&pf_rd_r=PZCAVDK88AC0G01J6GMG&pd_rd_wg=BczjM&pd_rd_r=f974e473-cb45-4b52-8852-b5f01e4d2ce1&pd_rd_i=1838858636&psc=1',
        rating: '4.7'
      },
      {
        id: 44,
        title: 'Skin in the Game: Hidden Asymmetries in Daily Life',
        genre: ['self-development', 'success'],
        author: 'Nassim Nicholas Taleb',
        imageUrl: 'https://m.media-amazon.com/images/I/61ZHZle28QL._SL1500_.jpg',
        linkToBuy: 'https://www.amazon.com.br/Skin-Game-Hidden-Asymmetries-Daily/dp/0425284646/ref=pd_sim_d_sccl_2_3/133-2149500-7288322?pd_rd_w=AgTsF&content-id=amzn1.sym.8555f615-361b-42f7-96c4-206bb8a5174e&pf_rd_p=8555f615-361b-42f7-96c4-206bb8a5174e&pf_rd_r=H4GRMW18RVP4BYTCKWF1&pd_rd_wg=S3g5a&pd_rd_r=44490f05-2236-4084-9276-3457ae9b3364&pd_rd_i=0425284646&psc=1',
        rating: '4.5'
      },
      {
        id: 45,
        title: '10% humano',
        genre: ['health', 'scientific'],
        author: 'Alanna Collen',
        imageUrl: 'https://m.media-amazon.com/images/I/61Mwpj-OpIL._SL1006_.jpg',
        linkToBuy: 'https://www.amazon.com.br/10-Humano-Micro-organismos-Chave-Sa%C3%BAde/dp/8543103444/ref=sr_1_1?__mk_pt_BR=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=3IC4U9EWGA4RU&dib=eyJ2IjoiMSJ9._10-bslczXIiYMNnp_F2HhMeq29s9zByxlbDHb8BChC2hq61-zQfn0dmMVCt3d5ln7OhQqTrS_HXqfnJUO2EPnmqO3AVTQcNPfY5lE_80ZP92QqqdWtnLgR5gVLvCwD9hMXP_PjRk0vt1-bmTCxOFiCQ9dmJPDcq_wlSlFVeso6yQrRu4Fmg5b3Je_Z0sCYp5AMPn4ejcpSTSxSGVyvdMTvyccYW_xE6pjDPxIa_VsI.ykgqDyrFg-m7pxU7dWjmW09q-ZLyKJe0W-q8SGW5I6s&dib_tag=se&keywords=10%25+humano&qid=1726159153&s=books&sprefix=10+humano%2Cstripbooks%2C234&sr=1-1',
        rating: '4.8'
      },
      {
        id: 46,
        title: 'Mude seus horários, mude sua vida',
        genre: ['health', 'self-development'],
        author: 'Suhas Kshirsagar',
        imageUrl: 'https://m.media-amazon.com/images/I/715uU8nU-WL._SL1500_.jpg',
        linkToBuy: 'https://www.amazon.com.br/Mude-seus-hor%C3%A1rios-mude-vida/dp/8543109205/ref=pd_sim_d_sccl_3_15/133-2149500-7288322?pd_rd_w=J2811&content-id=amzn1.sym.8555f615-361b-42f7-96c4-206bb8a5174e&pf_rd_p=8555f615-361b-42f7-96c4-206bb8a5174e&pf_rd_r=EK5W1PF8E373NQ5TB92K&pd_rd_wg=W4Fyq&pd_rd_r=fc9cccea-f98e-4826-aacf-707f6d4ae3e2&pd_rd_i=8543109205&psc=1',
        rating: '4.7'
      },
      {
        id: 47,
        title: 'Comporte-se: A biologia humana em nosso melhor e pior',
        genre: ['scientific', 'self-development'],
        author: 'Robert M. Sapolsky',
        imageUrl: 'https://m.media-amazon.com/images/I/81YhbWeBPCS._SL1500_.jpg',
        linkToBuy: 'https://www.amazon.com.br/Comporte-se-biologia-humana-nosso-melhor/dp/8525064027/ref=sr_1_1?__mk_pt_BR=%C3%85M%C3%85%C5%BD%C3%95%C3%91&dib=eyJ2IjoiMSJ9._10-bslczXIiYMNnp_F2HhMeq29s9zByxlbDHb8BChC2hq61-zQfn0dmMVCt3d5ln7OhQqTrS_HXqfnJUO2EPnmqO3AVTQcNPfY5lE_80ZP92QqqdWtnLgR5gVLvCwD9hMXP_PjRk0vt1-bmTCxOFiCQ9dmJPDcq_wlSlFVeso6yQrRu4Fmg5b3Je_Z0sCYp5AMPn4ejcpSTSxSGVyvdMTvyccYW_xE6pjDPxIa_VsI.ykgqDyrFg-m7pxU7dWjmW09q-ZLyKJe0W-q8SGW5I6s&dib_tag=se&keywords=10%25+humano&qid=1726159153&s=books&sprefix=10+humano%2Cstripbooks%2C234&sr=1-1',
        rating: '4.7'
      },
      {
        id: 48,
        title: "Ikigai",
        genre: ["self-development"],
        author: "Ken Mogi",
        imageUrl: "https://m.media-amazon.com/images/I/71Ywn5J6XNL._SL1492_.jpg",
        linkToBuy: "https://www.amazon.com.br/IKIGAI-cinco-passos-encotrar-prop%C3%B3sito/dp/8582467311/ref=pd_sim_d_sccl_2_30/133-2149500-7288322?pd_rd_w=zKdFN&content-id=amzn1.sym.8555f615-361b-42f7-96c4-206bb8a5174e&pf_rd_p=8555f615-361b-42f7-96c4-206bb8a5174e&pf_rd_r=XAJFP83BXBC3WHBDQB0W&pd_rd_wg=WeS6H&pd_rd_r=72974fb6-ee15-4b04-97c5-92cdd750fb5f&pd_rd_i=8582467311&psc=1",
        "rating": "4.5"
      },
      {
        id : 49,
        title: "O palhaço e o psicanalista: Como escutar os outros pode transformar vidas",
        genre: ["self-development"],
        author: "Christian Dunker, Cláudio Thebas",
        imageUrl: "https://m.media-amazon.com/images/I/81QZ67LnZ8L._SL1500_.jpg",
        linkToBuy: "https://www.amazon.com.br/dp/6555352833/ref=sspa_dk_detail_5?psc=1&pd_rd_i=6555352833&pd_rd_w=UlXIo&content-id=amzn1.sym.1868afab-d777-4b70-8899-1b323ad91d95&pf_rd_p=1868afab-d777-4b70-8899-1b323ad91d95&pf_rd_r=9BCP7QZR9FY7RHG9XYYQ&pd_rd_wg=xr63T&pd_rd_r=b7a6fb4e-3963-4121-a3f4-1cfe4f692cb7&s=books&sp_csd=d2lkZ2V0TmFtZT1zcF9kZXRhaWw",
        "rating": "4.7"
      },
      {
        id : 50,
        title: "Iludidos pelo acaso: A influência da sorte nos mercados e na vida",
        genre: ["self-development"],
        author: "Nassim Nicholas Taleb",
        imageUrl: "https://m.media-amazon.com/images/I/81j15XZb34L._SL1500_.jpg",
        linkToBuy: "https://www.amazon.com.br/Iludidos-pelo-acaso-influ%C3%AAncia-mercados/dp/8547000968/ref=pd_sim_d_sccl_3_1/133-2149500-7288322?pd_rd_w=Xj7E7&content-id=amzn1.sym.8555f615-361b-42f7-96c4-206bb8a5174e&pf_rd_p=8555f615-361b-42f7-96c4-206bb8a5174e&pf_rd_r=9BCP7QZR9FY7RHG9XYYQ&pd_rd_wg=xr63T&pd_rd_r=b7a6fb4e-3963-4121-a3f4-1cfe4f692cb7&pd_rd_i=8547000968&psc=1",
        "rating": "4.7"
      },
      {
        id : 51,
        title: "Meditações: O diário do imperador estóico Marco Aurélio",
        genre: ["biography"],
        author: "Marco Aurélio",
        imageUrl: "https://m.media-amazon.com/images/I/81LgMmwDhwL._SL1500_.jpg",
        linkToBuy: "https://www.amazon.com.br/Medita%C3%A7%C3%B5es-di%C3%A1rio-imperador-est%C3%B3ico-Aur%C3%A9lio/dp/6587885330/ref=sr_1_27?__mk_pt_BR=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=9G5459XNZR4N&dib=eyJ2IjoiMSJ9.fnnkWIFyWDy7U0ucvmHyiesFakXTAIed9tbm4bINrL-BxFNJ_Lebe90l7De3NIo6F7YHJDt1evhHWd1yvITN2Y1iB97c0jHtYLSldKxsUUpn8fdlbom7ERhwJZisEmSefFxVFF5ydrbI8bxOMefngWiC_usJzQ9o6wlhZwXiP4HHj7gnr5XyG-5miBh5Tkoj.yJpMAjgAv9phT8N8W8gug2MHvh4j3tMezudt0LC13ds&dib_tag=se&keywords=biografia&qid=1726164654&refinements=p_72%3A17833786011&rnid=5560472011&s=books&sprefix=biografia%2Cstripbooks%2C228&sr=1-27",
        "rating": "4.7"
      },
      {
        id : 52,
        title: "Diário estoico",
        genre: ["biography"],
        author: "Ryan Holiday, Stephen Hanselman",
        imageUrl: "https://m.media-amazon.com/images/I/71DMS2JCTXL._SL1500_.jpg",
        linkToBuy: "https://www.amazon.com.br/Di%C3%A1rio-Estoico-Li%C3%A7%C3%B5es-Sabedoria-Perseveran%C3%A7a/dp/6555605553/ref=pd_sim_d_sccl_2_2/133-2149500-7288322?pd_rd_w=P6T6q&content-id=amzn1.sym.8555f615-361b-42f7-96c4-206bb8a5174e&pf_rd_p=8555f615-361b-42f7-96c4-206bb8a5174e&pf_rd_r=0WG0QPEY9AZBKS3H14P4&pd_rd_wg=Z3nn0&pd_rd_r=1b3e322a-d02b-43f6-ae1f-c5607f683293&pd_rd_i=6555605553&psc=1",
        "rating": "4.9"
      },
      {
        id : 53,
        title: "A marca da vitória: A autobiografia do criador da Nike",
        genre: ["biography"],
        author: "Phil Knight",
        imageUrl: "https://m.media-amazon.com/images/I/51PDs0RT7vL._SL1006_.jpg",
        linkToBuy: "https://www.amazon.com.br/marca-vit%C3%B3ria-Phil-Knight/dp/8543104467/ref=sr_1_9?__mk_pt_BR=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=9G5459XNZR4N&dib=eyJ2IjoiMSJ9.3u6M1UAMukE0y23NmJ7RUDNbCtLh71nMU3RKr4Rwk1FrcTRsoJ3iu8jNESWSBA31xnscQWOeXYA0USPjyt3Fx79xeLlMGNqaO2XVuGqCEC_JvUDvJ-rq71xZLrineYEWNwd1MJ2dWN9O9EuG4hSaXZIcv_Pm5ZepUBDSVV52zD369tFsCw0pr5LyEs-fnfE5zFDWjibx0wF0XdEASwbMMUZS5FYEtc-v8-oOtY900Vs.g3iGQVcZQu10ouwdbm04nK8VaTt4aBUoq3WL_kjdHpE&dib_tag=se&keywords=biografia&qid=1726164572&refinements=p_72%3A17833786011&rnid=5560472011&s=books&sprefix=biografia%2Cstripbooks%2C228&sr=1-9",
        "rating": "4.8"
      },
      {
        id: 54,
        title: 'Steve Jobs',
        genre: ['biography'],
        author: 'Phil Knight',
        imageUrl: 'https://m.media-amazon.com/images/I/51rVYANstPL._SL1000_.jpg',
        linkToBuy: 'https://www.amazon.com.br/Steve-Jobs-Walter-Isaacson/dp/6555603321/ref=sr_1_18?__mk_pt_BR=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=9G5459XNZR4N&dib=eyJ2IjoiMSJ9.fnnkWIFyWDy7U0ucvmHyiesFakXTAIed9tbm4bINrL-BxFNJ_Lebe90l7De3NIo6F7YHJDt1evhHWd1yvITN2Y1iB97c0jHtYLSldKxsUUpn8fdlbom7ERhwJZisEmSefFxVFF5ydrbI8bxOMefngWiC_usJzQ9o6wlhZwXiP4HHj7gnr5XyG-5miBh5Tkoj.yJpMAjgAv9phT8N8W8gug2MHvh4j3tMezudt0LC13ds&dib_tag=se&keywords=biografia&qid=1726164654&refinements=p_72%3A17833786011&rnid=5560472011&s=books&sprefix=biografia%2Cstripbooks%2C228&sr=1-18',
        rating: '4.9'
       },
       {
        id: 55,
        title: 'Dedique-se de coração',
        genre: ['biography'],
        author: 'Howard Schultz',
        imageUrl: 'https://m.media-amazon.com/images/I/51E6JefALvL._SL1000_.jpg',
        linkToBuy: 'https://www.amazon.com.br/Dedique-se-cora%C3%A7%C3%A3o-hist%C3%B3ria-Starbucks-empresa/dp/6580435194/ref=pd_sim_d_sccl_2_10/133-2149500-7288322?pd_rd_w=vPtX0&content-id=amzn1.sym.8555f615-361b-42f7-96c4-206bb8a5174e&pf_rd_p=8555f615-361b-42f7-96c4-206bb8a5174e&pf_rd_r=630RGPZPZN5GGD69JZ5G&pd_rd_wg=qSwY3&pd_rd_r=e6e1c1e5-ee94-493a-b3dd-a679f97b9e73&pd_rd_i=6580435194&psc=1',
        rating: '4.8'
       },
       {
        id: 56,
        title: 'O cérebro que se transforma: Como a neurociência pode curar as pessoas',
        genre: ['scientific', 'self-development'],
        author: 'Norman Doidge',
        imageUrl: 'https://m.media-amazon.com/images/I/916ATSEuFwL._SL1500_.jpg',
        linkToBuy: 'https://www.amazon.com.br/c%C3%A9rebro-que-transforma-neuroci%C3%AAncia-pessoas/dp/8501083852/ref=sr_1_4?crid=2I9TT2PY9L10Y&dib=eyJ2IjoiMSJ9.bn4eSYYZLEpQN5lxe-hgTUqa6RQtJceo0OFiEaBKWaUkYFwbhuvlZFsdQIpm8AYIp_EVJzFnRFKNtpXYHwMECJiVn6s0R0tHP5klRWKVt7c.YhN-PhB9wbnEv0-Ir1JxdV8ne66X4k_JdPYl2d6y1tQ&dib_tag=se&keywords=comporte-se+a+biologia+humana+em+nosso+melhor+e+pior&qid=1726371103&sprefix=Comporte-se%3A+a+%2Caps%2C215&sr=8-4',
        rating: '4.8'
       }
];

export const addBooksToDB = async () => {
    try {
        await Promise.all(booksData.map(book => {
            const bookRef = ref(database, `books/${book.id}`); // Passa a instância do banco de dados
            return set(bookRef, book); // Define os dados do livro
        }));
        console.log('Books added successfully!');
    } catch (error) {
        console.error('Error adding books to DB: ', error);
    }
};

export const addUserSelectedGenresToDB = async(userData: string[], userAuthId: string) => {
    const settingUserPreferencies = (userData: string[], userAuthId: string) => {
      const userGenrePreferencesRef = ref(database, `users/${userAuthId}/preferences`);
      return set(userGenrePreferencesRef, userData);
    }
    try {
      const AddUserPreferencesPromise = new Promise((resolve, ) => {
        setTimeout(() => {
          resolve(
            settingUserPreferencies(userData, userAuthId)
          )
        }, 100);
      });

      AddUserPreferencesPromise.then(() => console.log('User´s preferences added successfully!'));
    }
    catch(error) {
      console.error("Error adding user's preferred genres:", error)
    }
}