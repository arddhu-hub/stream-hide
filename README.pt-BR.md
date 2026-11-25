# Stream Hide

Oculta uma lista independente de arquivos e pastas no explorador do Obsidian.
Use o botão com ícone de vídeo ou a paleta de comandos. Adicione itens pelo menu
de contexto, ou informe um caminho relativo ao cofre por linha nas configurações.
A lista começa vazia, com a ocultação desligada. Renomeações atualizam os caminhos.

**Oculta apenas no explorador.** Busca, links, abas abertas, seletor rápido e
outros plugins continuam podendo mostrar as notas. Não protege o acesso aos dados
nem garante que uma nota não apareça durante uma transmissão.

Copie `main.js` e `manifest.json` da release para
`<cofre>/.obsidian/plugins/stream-hide/` e ative o plugin. Requer Obsidian desktop
1.15.1 ou superior. Sem suporte a celular ou janelas destacadas nesta versão.
Temas podem interferir no CSS do explorador. Ainda não aceito no catálogo oficial.

Para migrar do antigo **Stream Mode** (`urdh-file-hider-live`), desative-o e copie
a lista de caminhos pelas configurações. Alternativamente, com ambos desativados,
copie seu `data.json` antigo para a nova pasta. Guarde a pasta antiga até conferir.
Não ative as duas versões simultaneamente. Nenhum dado pessoal acompanha a release.

As configurações ficam em `data.json` dentro do cofre. Não usa rede, telemetria,
IA, contas externas ou arquivos fora do cofre. Não apaga nem move notas.

Autor e mantenedor: **Arddhu**. **Toda a codificação própria foi feita pelo
OpenAI Codex, sob direção de Arddhu.** O projeto nasceu da adaptação solicitada
do **File Hider**, de **Oliver Akins**, com implementação independente.
[Origem e créditos completos](ATTRIBUTION.md). Licença MIT; forks e contribuições
são permitidos. A entrada no catálogo do Obsidian depende de revisão própria.
