import React, { useEffect } from 'react';

function FormularioEnderecos() {

    const regex_cep = /[0-9]{5}-[0-9]{3}/

    useEffect(() => {
        let cepPlace = document.querySelector('#cep');

        if (cepPlace) {
            cepPlace.addEventListener('keypress', e => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    let cep = cepPlace.value;
                    if(regex_cep.test(cep)){
                        fetch(`https://viacep.com.br/ws/${cep}/json/`)
                            .then(response => response.json()).then(data => {
                                if(data.logradouro != undefined){
                                    document.querySelector('#rua').value = data.logradouro;
                                    document.querySelector('#bairro').value = data.bairro;
                                    document.querySelector('#estado').value = data.uf;
                                    document.querySelector('#cidade').value = data.localidade;
                                }

                            }).catch(error => {
                                document.querySelector('#rua').value = '';
                                document.querySelector('#bairro').value = '';
                                document.querySelector('#estado').value = '';
                                document.querySelector('#cidade').value = '';
                            })}
                }
            });
        }
    }, []);

    return (
        <main className="main-formulario">
            <h1 className="main-formulario__title">Endereço</h1>
            <form action="" autoComplete="off">
                <fieldset>
                    <label htmlFor="cep">CEP:</label>
                    <input className="main-formulario__campo" name="cep" type="text" id="cep" placeholder="Digite seu CEP" />
                    <br />
                    <br />
                    <label htmlFor="motivo">Estado:</label>
                    <input className="main-formulario__campo" name="estado" type="text" id="estado" placeholder="Digete o nome do seu estado" />
                    <br />
                    <br />
                    <label htmlFor="cidade">Cidade:</label>
                    <input className="main-formulario__campo" name="cidade" type="text" id="cidade" placeholder="Digite o nome da sua cidade " />
                    <br />
                    <br />
                    <label htmlFor="rua">Rua:</label>
                    <input className="main-formulario__campo" name="rua" type="text" id="rua" placeholder="Digite o nome da sua rua" />
                    <br />
                    <br />
                    <label htmlFor="rua">Bairro:</label>
                    <input className="main-formulario__campo" name="bairro" type="text" id="bairro" placeholder="Digite o nome do seu bairro" />
                    <br />
                    <br />
                    <label htmlFor="numero">Numero:</label>
                    <input className="main-formulario__campo" name="numero" type="text" id="numero" placeholder="Digite o numero de sua residencia" />
                    <br />
                    <br />
                    <label htmlFor="complemento">Complemento:</label>
                    <textarea className="main-formulario__campo" name="mensagem" maxLength="1000" minLength="20" type="text" id="mensagem" placeholder="Digite um complemento para seu endereço" /> 
                    <br />
                    <br />
                    <input className="btn" type="submit" />
                </fieldset>
            </form>
        </main>
    );
}

export default FormularioEnderecos;
