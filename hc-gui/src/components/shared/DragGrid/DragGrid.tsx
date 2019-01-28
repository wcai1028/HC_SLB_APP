import * as React from 'react'
import {
    A10Container,
    setupA10Container
  } from 'a10-gui-framework'
export interface IDragGridProps {}
export interface IDragGridState {}

const styles = require('./styles/draggrid.scss')

class DragGrid extends A10Container<IDragGridProps, IDragGridState> {
    
    dragEl:any
    nextEl:any
    myRef: any
    constructor(props: any) {
        super(props)
        this.myRef = React.createRef()
    }
    // const oldPos = [...section.children].map(item => {
    //     item.draggable = true
    //     let pos = document.getElementById(item.id).getBoundingClientRect();
    //     return pos;
    //   });
    handleDrag(event: any) {
        // console.log('Line 20 !!!!!!!!!!',this.dragEl, this.nextEl)
        this.dragEl = event.target
        this.nextEl = this.dragEl.nextSibling
        // console.log('Line 139 !!!!!!!!!!',this.dragEl, this.nextEl)
        event.dataTransfer.effectAllowed = 'move'
        event.dataTransfer.setData('Text', this.dragEl.textContent)
    }
    handleDragEnd(event: any) {
        // console.log('handleDragEnd !!!!!!!!!!',event)
    }

    handleDragOver(event: any) {
        // console.log('handleDragOver !!!!!!!!!!',event)
        event.preventDefault()
        event.dataTransfer.dropEffect = 'move'
        
        const target = event.target
        if( target && target !== this.dragEl && target.nodeName === 'DIV' && target.nextSibling && this.dragEl
                && this.dragEl.parentNode && target.nextSibling.parentNode 
                && (target.nextSibling.parentNode === this.dragEl.parentNode) 
                && (this.dragEl.parentNode === this.myRef.current )){
                    if(target.classList.contains('inside')) {
                        event.stopPropagation()
                    } else {
                        const targetPos = target.getBoundingClientRect()
                        const next = (event.clientY - targetPos.top) / (targetPos.bottom - targetPos.top) > .5 || 
                                        (event.clientX - targetPos.left) / (targetPos.right - targetPos.left) > .5
                        // console.log('next !!!!!!!!!!!!',next)
                        if(next && this.dragEl.parentNode && target.nextSibling.parentNode 
                                && (target.nextSibling.parentNode === this.dragEl.parentNode) 
                                && (this.dragEl.parentNode === this.myRef.current ) ){
                            // console.log('this.myRef.current !!!!!!!!!!!!',this.myRef)
                            // console.log('this.dragEl !!!!!!!!!!!!',this.dragEl)
                            // console.log('target.nextSibling !!!!!!!!!!!!',target)
                            this.myRef.current.insertBefore(this.dragEl,target.nextSibling || target)
                        }
                    }
        }   
    }

    render(){
        return(
            <div>
            <div id="list" ref={this.myRef} onDragOver={()=>{this.handleDragOver(event)}} onDragEnd={()=>{this.handleDragEnd(event)}} onDragStart={()=>{this.handleDrag(event)}} >
                <div id='div1' draggable= {true} className='divRec'><div className='inside'>item 1</div></div>
                <div id='div2' draggable= {true} className='divQuad'><div className='inside'>item 2</div></div>
                <div id='div3' draggable= {true} className='divRec'><div className='inside'>item 3</div></div>
                <div id='div4' draggable= {true} className='divCard'><div className='inside'>item 4</div></div>
                <div id='div5' draggable= {true} className='divRec'><div className='inside'>item 5</div></div>
                <div id='div6' draggable= {true} className='divQuad'><div className='inside'>item 6</div></div>
                <div id='div7' draggable= {true} className='divCard'><div className='inside'>item 7</div></div>
                <div id='div8' draggable= {true} className='divRec'><div className='inside'>item 8</div></div>
            </div>
        </div>
        )
    }
}

export default setupA10Container(DragGrid)