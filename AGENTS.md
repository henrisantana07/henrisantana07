# AGENTS.md

Diretrizes para agentes de IA (opencode, Claude Code, Copilot) que operam neste repositório.

## Repositório principal

Este é o **repositório principal** de trabalho do `henrisantana07`.

| Item | Valor |
| --- | --- |
| Repo GitHub | https://github.com/henrisantana07/henrisantana07 |
| Caminho local | `C:\Users\henri\Desktop\henrisantana07` |
| Branch principal | `main` |
| Visibilidade | Pública |

## Regras de git (obrigatórias)

1. **Todo** `commit`, `push` e operação git deve ser executado com o diretório de trabalho em
   `C:\Users\henri\Desktop\henrisantana07`. Este é o único repositório de trabalho.
2. **Nunca** commitar ou dar push a partir de `C:\Users\henri` (raiz da home). Esse repo é
   **legado**: ele aponta o remote para cá, mas versiona a home inteira e tem histórico
   desconectado. Qualquer push a partir dali é rejeitado — e deve continuar sendo.
3. Antes de qualquer operação git, confirmar o contexto:
   ```bash
   git rev-parse --show-toplevel   # deve retornar .../Desktop/henrisantana07
   git remote -v                   # deve apontar para henrisantana07/henrisantana07
   git status -sb
   ```
4. Usar **Conventional Commits** em português:
   `feat(scope): descrição`, `fix(scope): descrição`, `chore: descrição`.
   - assunto: até 50 caracteres, imperativo, minúsculo, sem ponto final
   - corpo: quebrado em 72 colunas, explicando **o quê** e **por quê**
5. `main` é **protegida** no GitHub (ruleset ativo): force-push e deleção são bloqueados.
   Nunca tentar contornar isso.
6. Nunca commitar segredos. O `.gitignore` já exclui `.env`, chaves e credenciais — manter assim.
7. Se o contexto git estiver errado, **parar e corrigir** antes de commitar. Nunca commitar
   em um repositório diferente do esperado.

## Repositórios relacionados (mantidos separados)

| Projeto | Repo | Observação |
| --- | --- | --- |
| ember-music | `henrisantana07/ember-music` | Projeto próprio, **não** faz parte deste repo |
| Portifolio | `henrisantana07/Portifolio` | Projeto próprio |
| painel | `henrisantana07/painel` | Projeto privado |
| player_netfilix | `henrisantana07/player_netfilix` | Projeto privado |

## Estrutura

```
.
├── .gitignore
├── AGENTS.md        # este arquivo
├── CLAUDE.md        # atalho para o Claude Code
├── README.md
└── .vscode/
    └── settings.json
```
