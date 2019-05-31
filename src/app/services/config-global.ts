export class ConfigGlobal {
  // Geral
  GLOBAL_URL = 'http://local.tangoseed.com.br/';

  // Laravel Passport
  CLIENT_ID = 1;
  CLIENT_SECRET = 'fdHRZnvBamIrCcObWkawHft5cxweKII5O9I9JlW8';

  // Traduçao de tabelas
  TABLE_PTBR: any = {
    'decimal':        '',
    'emptyTable':     'Sem dados disponíveis na tabela',
    'info':           'Mostrando _START_ para _END_ de _TOTAL_ entradas',
    'infoEmpty':      'Mostrando 0 para 0 de 0 entradas',
    'infoFiltered':   '(filtrado de _MAX_ entradas totais)',
    'infoPostFix':    '',
    'thousands':      ',',
    'lengthMenu':     'Show _MENU_ entries',
    'loadingRecords': 'Carregando...',
    'processing':     'Em processamento...',
    'search':         'Pesquisa:',
    'zeroRecords':    'Nenhum registro correspondente encontrado',
    'paginate': {
      'first':      'Primeira',
      'last':       'Ultima',
      'next':       'Proxima',
      'previous':   'Anterior'
    },
    'aria': {
      'sortAscending':  ': ativar para classificar coluna ascendente',
      'sortDescending': ': ativar para classificar coluna descendente'
    }
  };

  TABLE_LANG: any = this.TABLE_PTBR;

}
