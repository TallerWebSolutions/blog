# Blog Taller
> O blog da Taller utliza a plataforma [Ghost](https://github.com/TryGhost/Ghost).

## Instalação

```bash
# Clone do repositório
git clone https://github.com/TallerWebSolutions/blog

# Instalar dependências
bower install
npm install

# Compilar o SASS
cd /content/themes/taller/assets/sass
compass compile

# Executar (na raiz do projeto)
npm start
```

## Branches

### fs/#id-description
Cada branch **fs/#id** representa uma issue do board.

### dev
Faz deploy automático em [homolog-blog.taller.net.br](http://homolog-blog.taller.net.br) e serve para testes internos.

### master
Todo merge feito em master irá para produção [blog.taller.net.br](http://blog.taller.net.br)
