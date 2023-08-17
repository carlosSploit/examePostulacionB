/* eslint-disable eqeqeq */
import { DownOutlined, FileOutlined, UpOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import "./style.css";

export function Componentcolapset(props){
    const [ isstateOcult,setisstateOcult] = useState(false);
    const { stateOcult = isstateOcult,setstateOcult = setisstateOcult, children} = props;

    return (
        <>
            <div style={{height:"5px"}}/>
            <div className="component_collaps_content">
                {children}
            </div>
        </>
    );
}

export function ComponentcolapsetHeader(props){
    const {children, label="Title de chips", oncollapset = (stade) => {}, colorB = "#9686C3", colorT = "white" } = props;
    const [stateOcult,setstateOcult] = useState(false);
    return (
        <>
            <div className="component_collaps_header" style={{ backgroundColor: `${colorB}`}} >
                    <div className="component_collaps_header_title" style={{color: `${colorT}`, userSelect: 'none'}} >{label}</div>
                    {children}
                    <div onClick={()=>{
                        setstateOcult(!stateOcult);
                        oncollapset(!stateOcult);
                    }} className="component_collaps_header_actioncolap">
                        {(!stateOcult)?
                            <DownOutlined className="component_collaps_header_icon" />:
                            <UpOutlined className="component_collaps_header_icon" />
                        }
                    </div>
                    <div style={{width:"10px"}} />
            </div>  
        </>
    );
}

export function ComponentcolapsetBody(props){
    const [ isstateOcult,setisstateOcult] = useState(false);
    const { stateOcult = isstateOcult,setstateOcult = setisstateOcult, children } = props;

    return [
        <>
            {
                (stateOcult)?
                <div className="component_collaps_body">
                    {children}
                </div>:
                <></>
            } 
        </>
    ];
}

export function ComponentcolapsetItem(props){
    const { Iconitem = FileOutlined, 
            urlIcon = "",
            stadeInit = false,
            isSelector = true,
            children,
            id=7128378129,
            label="Primer item de process",
            url="",
            onChange=(id, stade)=>{}} = props;
    const [isSelectect, setisSelectect] = useState(false)

    useEffect(()=>{
        (async ()=>{
            setisSelectect(stadeInit)
        })();
    },[])

    return (
        <div className="component_collaps_body_item">
            <div className="component_collaps_body_content">
                <div className="component_collaps_body_item_content_icon" >
                    {(urlIcon == '')?
                        <Iconitem className="component_collaps_body_item_icon"/>
                    :
                        <div className="component_collaps_body_item_iconUrl" style={{backgroundImage: `url('${urlIcon}')`}} />
                    }
                    
                </div>
                <div className="component_collaps_body_item_info">
                    <div onClick={onChange} className="component_collaps_body_item_title">{label}</div>
                    <div className="component_collaps_body_item_subtitle">{url}</div>
                </div>
                {(isSelector)?<div className="component_collaps_body_item_selector"><div className="component_collaps_body_item_selector_contr" style={{borderColor: `${(!isSelectect)?"#D9D5F2":"#9C5EF2"}`}} onClick={()=>{
                    setisSelectect(!isSelectect);
                    onChange(id, !isSelectect);
                }}>
                    <div style={{backgroundColor: `${(!isSelectect)?"#D9D5F2":"#9C5EF2"}`}}></div>
                </div></div>:<></>}
                {children}
            </div>
        </div>
    );
}


export function ComponentCardItemUrl(props){
    const { Iconitem = FileOutlined, 
            urlIcon = "",
            children, 
            label="Primer item de process",
            url="",
            onChange=()=>{}} = props;

    useEffect(()=>{
        (()=>{
            console.log(urlIcon)
        })();
    },[])

    return (
        <div className="component_collaps_body_item">
            <div className="component_collaps_body_content_card">
                <div className="component_collaps_body_item_content_icon">
                    {(urlIcon == '')?
                        <Iconitem className="component_collaps_body_item_icon"/>
                    :
                        <div className="component_collaps_body_item_iconUrl" style={{backgroundImage: `url('${urlIcon}')`}} />
                    }
                </div>
                <div className="component_collaps_body_item_info">
                    <div onClick={onChange} className="component_collaps_body_item_title" style={{userSelect: 'none'}} >{label}</div>
                    <div className="component_collaps_body_item_subtitle" style={{userSelect: 'none'}} >{url}</div>
                </div>
                {children}
            </div>
        </div>
    );
}

export function ComponentcolapsetItemActions(props){
    const {Icont = UpOutlined, onClickActions = () =>{
        console.log("Teniendo Accion")
    }} = props;

    return(
        <div onClick={()=>{onClickActions()}} className="component_collaps_header_actioncolap">
            <Icont className="component_collaps_header_icon" />
        </div>
    );
}