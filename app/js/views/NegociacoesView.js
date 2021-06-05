System.register(["./index"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var index_1, NegociacoesView;
    return {
        setters: [
            function (index_1_1) {
                index_1 = index_1_1;
            }
        ],
        execute: function () {
            NegociacoesView = class NegociacoesView extends index_1.View {
                template(model) {
                    return `
        <table class="table table-hover table-bordered">
            <thead>
                <tr>
                    <th>DATA</th>
                    <th>QUANTIDADE</th>
                    <th>VALOR</th>
                    <th>VOLUME</th>
                </tr>
            </thead>
            <tbody>
                ${model.paraArray().map((negociacao) => `
                    <tr>
                        <td>
                            ${negociacao.data.getDate()}/${negociacao.data.getMonth() + 1}/${negociacao.data.getFullYear()}
                        </td>
                        <td>
                            ${negociacao.quantidade}
                        </td>
                        <td>
                            ${negociacao.valor}
                        </td>
                        <td>
                            ${negociacao.volume}
                        </td>
                    </tr>
                `).join('')}
            </tbody>
            <tfoot>
            </tfoot>
        </table>
        `;
                }
            };
            exports_1("NegociacoesView", NegociacoesView);
        }
    };
});
