import express from 'express';

const app = express();

const PORT = 3230;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('pagina'));

app.set('view engine', 'ejs');
app.set('views', './views');

function classificarIMC(imc) {
  if (imc < 16) return "Baixo peso (grau I)";
  if (imc < 17) return "Baixo peso (grau II)";
  if (imc < 18.5) return "Baixo peso (grau III)";
  if (imc < 25) return "Peso adequado";
  if (imc < 30) return "Sobrepeso";
  if (imc < 35) return "Obesidade (grau I)";
  if (imc < 40) return "Obesidade (grau II)";
  return "Obesidade (grau III)";
}

app.get('/', function (req, res){
    res.send('Entrei na pagina principal');
})

app.post('/calcular', (req, res) => {
  const {nome, altura, peso} = req.body;
  const imc = peso / (altura * altura);
  const classificacao = classificarIMC(imc);

   res.render('resultado', {
    nome,
    altura,
    peso,
    imc: imc.toFixed(2),
    classificacao
  });
});

app.listen(PORT, function(){
    console.log('Servidor conectado');
});