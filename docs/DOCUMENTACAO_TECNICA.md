
## Documentação Técnica

### Decisões Técnicas

- **Angular com Standalone Components**  
  Optei por usar componentes standalone no Angular 19 para tornar o projeto mais modular, enxuto e compatível com as boas práticas modernas da plataforma.

- **Arquitetura Clean + SOLID + KISS**  
  A estrutura foi dividida em camadas claras:  
  - `core/` para regras de negócio e entidades  
  - `data/` para simular APIs externas  
  - `pages/` para UI  
  - `shared/` para componentes reutilizáveis  
  Isso ajuda a manter separação de responsabilidades, facilita testes e manutenção e permite a reusabilidade.

- **AG Grid**  
  Usado para a tabela devido à sua robustez, personalização de colunas e suporte a seleção, ordenação e renderizadores personalizados.

- **ApexCharts**  
  Escolhido para visualização de dados devido à sua facilidade de integração com Angular e excelente suporte a gráficos empilhados.

### Possíveis Melhorias Futuras

- **Persistência de dados**  
  Integrar com uma API real (via `HttpClient`) e banco de dados para salvar as entidades iniciadas.

- **Múltiplos idiomas**  
  Suporte a múltiplos idiomas com `@ngx-translate`.

- **Testes Automatizados**  
  Incluir testes unitários com `Jest` e testes de integração com `Cypress`.


