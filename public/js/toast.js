const TOAST = {
    welcomeToast() {
        tata.info('Welcome', 'Welcome to FifaFans Meet your fellow fan, player and coach', {
            duration: 5000
          })
    },

    successToast(message){
        tata.success('Success', message)
    },

    infoToast(message) {
        tata.info('Status', message)
    }
}