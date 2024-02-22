const Title = () => {
  const styles = getStyles()

  return <h1 style={styles.title}>PEOPLE AND THEIR CARS</h1>
}

const getStyles = () => ({
  title: {
    fontSize: 30,
    textAlign: 'center',
  }
})

export default Title
