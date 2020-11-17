<!-- omit in toc -->
# Application Insights Analyzer

Ferramenta CLI para verificar a configuração correta de application insights em uma aplicação.

- [Uso](#uso)
- [Desenvolvimento, por onde começar](#desenvolvimento-por-onde-começar)
- [Como funciona](#como-funciona)
- [Parâmetros](#parâmetros)
  - [`--app`](#--app)
  - [`--dir`](#--dir)
  - [Exemplo completo](#exemplo-completo)
- [Variáveis de ambiente](#variáveis-de-ambiente)

## Uso
```bash
# Install
npm i -g @wizsolucoes/app-insights-analyzer

# Run
app-insights-analyzer
```

## Desenvolvimento, por onde começar
```bash
# Install
npm install

# Run tests
npm test

# Run
npm start
```

## Como funciona
A analisador segue os seguintes passos:
1. Busca a chave de instrumentação que deve ser usado pelo nome da aplicação sob análise,
2. Procura pela chave de instrumentação correta no código da aplicação,
3. Procura pela instalação do SDK de Application Insights no arquivo package.json.

## Parâmetros
### `--app` 
**(Required)** Nome do respositório da aplicação a ser analisada.

```sh
$ app-insights-analyzer --app speed-web
```

### `--dir`
Caminho para o diretório a ser analisado. **Default: "."**

```sh
$ app-insights-analyzer --dir projects/speed-web/src
```

### Exemplo completo
```sh
$ app-insights-analyzer --app speed-web --dir projects/speed-web/src
```

## Variáveis de ambiente
A ferramenta precisa usar os seguintes variáveis de ambiente para buscar a chave de instrumentação correspondente à aplicação.

`APPINSIGHTS_ANALYSIS_STORAGE_KEY` - Chave de accesso.

`APPINSIGHTS_ANALYSIS_STORAGE_ACCOUNT` - Nome da conta de storage.

`APPINSIGHTS_ANALYSIS_STORAGE_TABLE` - Nome da tabela da conta de storage para consultar chaves.

`APPINSIGHTS_ANALYSIS_RESULTS_STORAGE_TABLE` - Nome da tabela da conta de storage para publicar resultados.