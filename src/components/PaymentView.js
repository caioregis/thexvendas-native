import React, { Component } from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { ApplePayButton, PaymentRequest } from 'react-native-payments';

export default class PaymentView extends Component {

    state = {
        debug: ''
    }
    debug = text => {
        this.setState({
            debug: text
        })
    }

    showPaymentSheet = (succeed = true) => {
        const paymentRequest = new PaymentRequest(METHOD_DATA, DETAILS);
        paymentRequest.show().then(paymentResponse => {
            const card_token = paymentResponse.details.paymentToken;
            if(succeed) {
                paymentResponse.complete('success')
                this.debug(`Solicitação de pagamento concluída com token do cartão ${card_token}`);
            } else {
                paymentResponse.complete('failure')
                this.debug('Falha na solicitação de pagamento');
            }
        }).catch(error => {
            if(error.message === 'AbortError') {
                this.debug('A solicitação de pagamento foi rejeitada');
            }
        });
    };

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView>
                    <Text style={styles.title}>
                        Botão de pagamento nativo da Apple.
                    </Text>
                    <ApplePayButton
                        type="plain"
                        style="black"
                        onPress={() => this.showPaymentSheet(true)}
                    />
                    <Text style={styles.title}>
                        Qualquer componente clicável.
                    </Text>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this.showPaymentSheet(true)}
                    >
                        <Text style={styles.buttonText}>
                            Click-me
                        </Text>
                    </TouchableOpacity>
                    <Text style={styles.title}>
                        Simular erro de pagamento...
                    </Text>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this.showPaymentSheet(false)}
                    >
                        <Text style={styles.buttonText}>
                            Isso vai falhar
                        </Text>
                    </TouchableOpacity>
                    {
                        this.state.debug.length > 0
                        && <View style={styles.debug}>
                            <Text style={styles.debugText}>
                                {this.state.debug}
                            </Text>
                        </View>
                    }
                </ScrollView>
            </SafeAreaView>
        );
    }
}

const METHOD_DATA = [
    {
        supportedMethods: ['apple-pay'],
        data: {
            merchantIdentifier: 'merchant.com.your-app.namespace',
            supportedNetworks: ['visa', 'mastercard', 'amex'],
            countryCode: 'BR',
            currencyCode: 'BRL',
            // // uncomment this block to activate automatic Stripe tokenization.
            // // try putting your key pk_test... in here and see how the token format changes.
            // paymentMethodTokenizationParameters: {
            // 	parameters: {
            // 		gateway: 'stripe',
            // 		'stripe:publishableKey': Config.STRIPE_KEY,
            // 	},
            // },
        },
    },
];

const DETAILS = {
    id: 'basic-example',
    displayItems: [
        {
            label: 'Ingresso Cinema',
            amount: { currency: 'BRL', value: '15.00' },
        },
    ],
    total: {
        label: 'Cannondale Scalpel Hi-MOD 1 Mountain Bike Full',
        amount: { currency: 'BRL', value: '79.000' },
    },
};

const MARGIN = 20;

const styles = {
    container: {
        margin: MARGIN,
        flex: 1,
        alignItems: 'stretch'
    },
    title: {
        margin: MARGIN,
        marginTop: MARGIN * 3 / 2,
        color: '#4000FF',
        fontSize: 24,
        textAlign: 'center'
    },
    button: {
        backgroundColor: '#4000FF',
        padding: MARGIN,
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 18,
        color: '#FFFFFF',
    },
    debug: {
        marginTop: 'auto',
        backgroundColor: '#301139',
        padding: MARGIN,
        borderRadius: 3
    },
    debugText: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontFamily: 'Menlo',
    },
    details: {
        marginBottom: MARGIN,
        fontSize: 16
    },
}