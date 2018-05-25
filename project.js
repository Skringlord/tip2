document.getElementById('loan-form').addEventListener('submit', function(e){
    
    document.getElementById('results').style.display = 'none';

    document.getElementById('loading').style.display = 'block';

    setTimeout(calculateResults, 2000);
    e.preventDefault();
});

function calculateResults(){
    console.log('Calculating....');

    const uiAmount = document.getElementById('amount');
    const uiInterest = document.getElementById('interest');
    const uiYears = document.getElementById('years');
    const uiMontlyPayment = document.getElementById('montly-payment');
    const uiTotalPayment = document.getElementById('total-payment');
    const uiTotalInterest = document.getElementById('total-interest');

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const montly = (principal* x *calculatedInterest)/( x-1 );

    if(isFinite(montly)) {
        uiMontlyPayment.value = montly.toFixed(2);
        uiTotalPayment.value = (montly* calculatedPayments).toFixed(2);
        uiTotalInterest.value = ((montly * calculatedPayments)-principal).toFixed(2);

        document.getElementById('results').style.display = 'block';
        document.getElementById('loading').style.display = 'none';
    } else {
        showError('Please check your numbers');
    }
}

function showError(error){
    const errorDiv = document.createElement('div');
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');
    errorDiv.className = 'alert alert-danger';
    errorDiv.appendChild(document.createTextNode(error));
    card.insertBefore(errorDiv, heading);
    document.getElementById('loading').style.display = 'none';

    setTimeout(clearError, 3500);
}

function clearError(){
    document.querySelector('.alert').remove();
}