import './css/index.css'
import 'animate.css'
import Swal from 'sweetalert2'

/*--------------------------------------------------- */

//          variaveis de seleção e as variaveis para os input checked - START

const inputRange = document.querySelector('#inputRange')
const range = document.querySelector('#Range')
const lenghtPassword = document.querySelector('#length-password')
const includeUppercase = document.querySelector('#include-uppercase')
const includeLowercase = document.querySelector('#include-lowercase')
const includeNumbers = document.querySelector('#include-numbers')
const includeSymbols = document.querySelector('#include-symbols')
const generateButton = document.querySelector('#generate')
const generatedForce = document.querySelector('#generated-force')

const upperLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const lowerLetters = 'abcdefghijklmnopqrstuvwxyz'
const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
const symbols = ['!', '@', '#', '$', '%', '+', '-', '/', '?', '=']

//          variaveis de seleção e as variaveis para os input checked - END

/*--------------------------------------------------- */

//         criação de funções para gerar uma aleatoriedade - START

inputRange.addEventListener('change', () => {
   range.innerHTML = inputRange.value
})

function getLowercase() {
   return lowerLetters[Math.floor(Math.random() * lowerLetters.length)]
}

function getUppercase() {
   return upperLetters[Math.floor(Math.random() * upperLetters.length)]
}

function getNumber() {
   return numbers[Math.floor(Math.random() * numbers.length)]
}

function getSymbol() {
   return symbols[Math.floor(Math.random() * symbols.length)]
}

//         criação de funções para gerar uma aleatoriedade - END

/*--------------------------------------------------- */

generateButton.addEventListener('click', generatePassword)

function generatePassword() {
   const rangeLenght = inputRange.value

   let password = ''

   if (includeUppercase.checked) {
      password += getUppercase()
   }

   if (includeLowercase.checked) {
      password += getLowercase()
   }

   if (includeNumbers.checked) {
      password += getNumber()
   }

   if (includeSymbols.checked) {
      password += getSymbol()
   }

   for (let i = password.length; i < rangeLenght; i++) {
      const x = generateX()
      password += x
   }

   lenghtPassword.value = password

   /*--------------------------------------------------- */

   //          consuma da biblioteca SweetAlert

   let copyPassword = document.querySelector('#length-password')

   Swal.fire({
      icon: 'success',
      iconColor: '#0f0',
      title: `Senha criada com sucesso! 🔐`,
      heightAuto: false,
      showClass: {
         popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
         popup: 'animate__animated animate__fadeOutUp'
      },
      background: '#71b7ff',
      color: '#fff'
   })

   /*--------------------------------------------------- */

   //          chamando função de identificação da força da senha

   getCheckbox()
}

/*--------------------------------------------------- */

//          função criada para a identificar a força da senha - START

function getCheckbox() {
   let weigth = 0
   let forces = ['', 'Fraca', 'Média', 'Forte', 'Muito forte']
   let check = []
   let checkedInput = document.getElementsByName('checkedInput')

   for (let i = 0; i < checkedInput.length; i++) {
      if (checkedInput[i].checked) {
         check.push(checkedInput[i].value)
      }
   }

   /*
      A variavel da força é de acordo com pesos estabelecidos
      por uma média ponderada que vai dar no máximo até 4 pois é
      a quantidade de caracteres no array forces
   */

   weigth = Math.round((3 * inputRange.value + 1 * check.length * 5) / 20)

   generatedForce.innerText =
      forces[!!check.length && !!inputRange.value ? weigth : 0]
}

//          função criada para a identificar a força - END

/*--------------------------------------------------- */

//          função para verificar os input checked - START

/* 

Função para verificar se quando os input checked estão sendo marcados e em caso de marcado é feito um .push para a o array xs = []

*/

function generateX() {
   const xs = []
   if (includeUppercase.checked) {
      xs.push(getUppercase())
   }

   if (includeLowercase.checked) {
      xs.push(getLowercase())
   }

   if (includeNumbers.checked) {
      xs.push(getNumber())
   }

   if (includeSymbols.checked) {
      xs.push(getSymbol())
   }

   if (xs.length === 0) return ''

   return xs[Math.floor(Math.random() * xs.length)]
}

//           função para verificar os input checked - END

/*--------------------------------------------------- */

//          função para copiar - START

let copy = document.querySelector('#copy')

copy.addEventListener('click', () => {
   let copyPassword = document.querySelector('#length-password')

   navigator.clipboard.writeText(copyPassword.value)
})

//          função para copiar - END

/*--------------------------------------------------- */
