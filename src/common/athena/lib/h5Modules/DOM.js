const getRandomColor = () => {
  const letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

const DOM = {
  changeBut: (img) => {
    document.getElementsByClassName('image-change')[0].setAttribute('src', img)
  },
  changeTitleBackgroundColor: () => {
    document.getElementsByClassName('title')[0].style.backgroundColor = getRandomColor()
  }
}

export default DOM
