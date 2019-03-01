import  ParserService  from '../ParserService'

describe('should calculateInfix work', () => {

  const parserServiceInstance = new ParserService()

  it('should add formulate work', () => {
    expect(parserServiceInstance.calculateInfix(['(', 1, '+', 2, ')'])).toBe(3)  
    expect(parserServiceInstance.calculateInfix(['(', 10, '+', -2, ')'])).toBe(8)
    expect(parserServiceInstance.calculateInfix(['(', 1, '+', -2, ')'])).toBe(-1)
  })

  it('should minus formulate work', () => {
    expect(parserServiceInstance.calculateInfix(['(', 2, '-', 1, ')'])).toBe(1)  
    expect(parserServiceInstance.calculateInfix(['(', 1, '-', 2, ')'])).toBe(-1)
    expect(parserServiceInstance.calculateInfix(['(', 1, '-', -2, ')'])).toBe(3)
  })

  it('should multiply formulate work', () => {
    expect(parserServiceInstance.calculateInfix(['(', 2, '*', 1, ')'])).toBe(2)  
    expect(parserServiceInstance.calculateInfix(['(', 2, '*', -2, ')'])).toBe(-4)
    expect(parserServiceInstance.calculateInfix(['(', 2, '*', 0, ')'])).toBe(0)
    expect(parserServiceInstance.calculateInfix(['(', 0, '*', 2, ')'])).toBe(0)
  })

  it('should divided formulate work', () => {
    expect(parserServiceInstance.calculateInfix(['(', 2, '/', 1, ')'])).toBe(2)  
    expect(parserServiceInstance.calculateInfix(['(', 1, '/', 2, ')'])).toBe(0.5)
    expect(parserServiceInstance.calculateInfix(['(', 2, '/', -2, ')'])).toBe(-1)
    expect(parserServiceInstance.calculateInfix(['(', 0, '/', 2, ')'])).toBe(0)
    expect(parserServiceInstance.calculateInfix(['(', 2, '/', 0, ')'])).toBe(Infinity)
  })

  it('should mix type formulate work', () => {
    expect(parserServiceInstance.calculateInfix(['(', 2, '+', 2, '*', 2, '+', 3, ')'])).toBe(9)
  })

})
