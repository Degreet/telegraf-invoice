module.exports = {
	invoice(
		title,
		description,
		currency,
		isTest,
		priceAmount,
		priceLabel,
		token,
		params = {}
	) {
		if (params.max_tip_amount) {
			params.max_tip_amount *= 100;
		}

		if (params.suggested_tip_amounts) {
			params.suggested_tip_amounts = params.suggested_tip_amounts.map(
				(sum) => sum * 100
			);
		}

		return {
			title,
			description,
			currency,
			start_parameter: isTest ? 'test' : '',
			prices: [
				{
					label: priceLabel,
					amount: priceAmount * 100,
				},
			],
			provider_token: token,
			payload: token,
			...params,
		};
	},

	sendInvoice(ctx, ...args) {
		ctx.replyWithInvoice(this.invoice(...args));
	},
};
