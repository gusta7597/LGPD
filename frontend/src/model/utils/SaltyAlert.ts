interface ModalProperties {
    icon: "Warning" | "Error" | "Success" | "Info";
    title: string;
    text: string;
    closeOnClickOutside?: boolean;
    showConfirmButton?: boolean;
    showCancelButton?: boolean;
    timerInMiliseconds?: number;
    callback?: (value: boolean) => void;
}

interface ToastProperties {
    icon: "Warning" | "Error" | "Success" | "Info";
    text: string;
    timerInMiliseconds?: number;
}

class SaltyAlert {
    private body: HTMLElement = document.body;

    createBackdrop () : HTMLDivElement {
        const backdrop = document.createElement("div");
        backdrop.classList.add('saal-backdrop');
        return backdrop;
    }

    createModalCloseIcon (alertWrapper: HTMLElement, modal: HTMLElement) : HTMLSpanElement {
        const close = document.createElement('span');
        close.innerHTML = "&#10005";
        close.classList.add('saal-modal-close');

        close.addEventListener('click', () => {
            alertWrapper.classList.remove('opening');
            modal.classList.remove('opening');

            alertWrapper.classList.add('removing');
            modal.classList.add('removing');

            setTimeout(() => {
                alertWrapper.remove()
                modal.remove();
            }, 200);

        });

        return close;
    }

    createSvgIcon (iconName: string, isModalOrToast: "modal" | "toast") : HTMLSpanElement {
        let _ = document.createElement('div');
        _.innerHTML = this.getSvg(iconName);

        const svg = document.createElement('span');
        svg.append(_.firstChild!);

        if (isModalOrToast === "modal") {
            svg.classList.add('saal-modal-icon');
        } else {
            svg.classList.add('saal-toast-icon');
        }

        return svg;
    }

    createModalTitle (title: Text) : HTMLHeadingElement {
        const h1 = document.createElement('h1');
        h1.appendChild(title);
        h1.classList.add('saal-title');
        
        return h1;
    }

    createParagraph (text: Text) : HTMLParagraphElement {
        const p = document.createElement('p');
        p.appendChild(text);
        p.classList.add('saal-text');
        
        return p;
    }

    createButton (label: string, actionType: string, buttonType: HTMLButtonElement["type"],) : HTMLButtonElement {
        const button = document.createElement('button');
        button.appendChild(document.createTextNode(label));
        button.type = buttonType;
        button.classList.add('saal-button', actionType);

        return button;
    }
    
    modal(props: ModalProperties) : void {
        const wrapper = this.createBackdrop();
        const modal = document.createElement('div');
        const textContent = document.createElement('div');
        const text = document.createTextNode(props.text);
        const title = document.createTextNode(props.title);
        let confirmButton: HTMLButtonElement;
        let cancelButton: HTMLButtonElement;
        let actions: HTMLDivElement;

        // Creating close icon
        const close = this.createModalCloseIcon(wrapper, modal);
        // Creating icon element
        const svg = this.createSvgIcon(props.icon, "modal");
        // Creating alert title
        const h1 = this.createModalTitle(title);
        // Creating alert text
        const p = this.createParagraph(text);

        textContent.appendChild(h1);
        textContent.appendChild(p);
        textContent.classList.add('saal-textContent');

        modal.appendChild(close);
        modal.appendChild(svg);
        modal.appendChild(textContent);
        modal.classList.add('saal', 'modal');

        modal.style.width = '300px';
        modal.style.height = '320px';

        if (props.showConfirmButton || props.showCancelButton) {
            actions = document.createElement('div');
            actions.classList.add('saal-actions');
            props.closeOnClickOutside = false;
            props.timerInMiliseconds = undefined;

            if (props.showConfirmButton) {
                confirmButton = this.createButton('Confirmar', 'success', 'button');
                confirmButton.addEventListener('click', () => {
                    props.callback && props.callback(true);
                    wrapper.remove();
                    modal.remove();
                });

                confirmButton.classList.add('saal-success', 'saal-button');
                actions.appendChild(confirmButton);
            }
            if (props.showCancelButton) {
                cancelButton = this.createButton('Cancelar', 'cancel', 'button');
                cancelButton.addEventListener('click', () => {
                    props.callback && props.callback(false);
                    wrapper.remove();
                    modal.remove();
                });
                
                cancelButton.classList.add('saal-cancel', 'saal-button');
                actions.appendChild(cancelButton);
            }
            modal.appendChild(actions);
        }

        wrapper.classList.add('opening');
        modal.classList.add('opening');
        this.body.appendChild(wrapper);
        this.body.appendChild(modal);
        
        if (props.closeOnClickOutside) {
            wrapper.addEventListener('click', () => {
                wrapper.classList.remove('opening');
                modal.classList.remove('opening');

                wrapper.classList.add('removing');
                modal.classList.add('removing');

                setTimeout(() => {
                    modal.remove();
                    wrapper.remove();
                }, 200);
            });
        }
        
        if (props.timerInMiliseconds !== undefined) {
            window.setTimeout(() => {
                modal.remove();
                wrapper.remove();
            }, props.timerInMiliseconds);
        }
    }

    getSvg(type: string) : string {
        switch (type) {
            case "Warning":
                return `<svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><style>svg{overflow:visible}#i-circle{stroke-dasharray:306;stroke-dashoffset:306;animation:draw-circle .7s ease-in-out forwards}#i-icon{animation:animate-icon .4s .2s ease-in-out forwards}@keyframes draw-circle{to{stroke-dashoffset:0}}@keyframes animate-icon{0%{transform:translateX(0)}20%{transform:translateX(5px)}40%{transform:translateX(-5px)}60%{transform:translateX(5px)}80%{transform:translateX(-5px)}100%{trasnform:translateX(0)}}</style><path id="i-circle" d="M47.9398 3.94845C48.4882 2.86796 49.3196 2.5 50 2.5C50.6804 2.5 51.5118 2.86796 52.0602 3.94845L97.0998 92.6808C97.6664 93.7971 97.5993 95.0675 97.0998 96.0516C96.6016 97.033 95.8205 97.5 95.0395 97.5H4.96045C4.1795 97.5 3.39838 97.0329 2.90023 96.0516C2.40074 95.0675 2.33363 93.7971 2.90024 92.6808L47.9398 3.94845Z" stroke="#FDFD96" stroke-width="5"/><path id="i-icon" d="M49 45.4429C53.0298 45.2246 55.5 42.6507 55.5 39.479C55.5 36.1627 52.7995 33.5 49.5 33.5C46.2005 33.5 43.5 36.1627 43.5 39.479C43.5 42.6507 45.9702 45.2246 49.0721 45.4429C45.9702 45.6613 43.5 48.2352 43.5 51.4069V81.521C43.5 84.8373 46.2005 87.5 49.5 87.5C52.7995 87.5 55.5 84.8373 55.5 81.521V51.4069C55.5 48.2352 53.0298 45.6613 49.9279 45.4429Z" fill="#FDFD96" stroke="#ffffff" stroke-width="5"/></svg>`;
            case "Error":
                return `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" fill="none"><style>svg{overflow:visible}#i-circle{stroke-dasharray:300;stroke-dashoffset:300;animation:draw-circle .7s ease-in-out forwards}#i-icon{transform-origin:center;transform:scale(0);animation:animate-icon .7s .2s ease-in-out forwards}@keyframes draw-circle{0%{stroke-dashoffset:300}20%{stroke-dashoffset:300;transform:translateX(15px)}40%{stroke-dashoffset:300;transform:translateX(-15px)}60%{stroke-dashoffset:0;transform:translateX(15px)}80%{stroke-dashoffset:0;transform:translateX(-15px)}100%{stroke-dashoffset:0;transform:translateX(0)}}@keyframes animate-icon{0%{transform:scale(0)}20%{transform:scale(1) rotate(-15deg)}40%{transform:scale(1.6) rotate(15deg)}60%{transform:scale(1.6) rotate(-15deg)}80%{transform:scale(1.6) rotate(15deg)}100%{transform:scale(1) rotate(0)}}</style><path id="i-circle" d="M97.5 50C97.5 76.2335 76.2335 97.5 50 97.5C23.7665 97.5 2.5 76.2335 2.5 50C2.5 23.7665 23.7665 2.5 50 2.5C76.2335 2.5 97.5 23.7665 97.5 50Z" stroke="#FF6961" stroke-width="5" stroke-linejoin="round"/><path id="i-icon" d="M43.5 22.5085V61.5339C43.5 65.4001 46.6296 68.5424 50.5 68.5424C54.3704 68.5424 57.5 65.4001 57.5 61.5339V22.5085C57.5 18.6422 54.3704 15.5 50.5 15.5C46.6296 15.5 43.5 18.6422 43.5 22.5085ZM57.5 76.9915C57.5 73.1253 54.3704 69.9831 50.5 69.9831C46.6296 69.9831 43.5 73.1253 43.5 76.9915C43.5 80.8578 46.6296 84 50.5 84C54.3704 84 57.5 80.8578 57.5 76.9915Z" fill="#FF6961" stroke="#ffffff" stroke-width="5"/></svg>`;
            case "Success":
                return `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" fill="none"><style>svg{overflow:visible}#i-circle{stroke-dasharray:300;stroke-dashoffset:600;animation:draw-circle .7s ease-in-out forwards}#i-icon{stroke-dasharray:72;stroke-dashoffset:72;animation:animate-icon .7s .2s ease-in-out forwards}@keyframes draw-circle{to{stroke-dashoffset:0}}@keyframes animate-icon{to{stroke-dashoffset:0}}</style><path id="i-circle" d="M97.5 50C97.5 76.2335 76.2335 97.5 50 97.5C23.7665 97.5 2.5 76.2335 2.5 50C2.5 23.7665 23.7665 2.5 50 2.5C76.2335 2.5 97.5 23.7665 97.5 50Z" stroke="#77DD77" stroke-width="5" stroke-linejoin="round"/><path id="i-icon" d="M24 53L38.2929 67.2929C38.6834 67.6834 39.3166 67.6834 39.7071 67.2929L75 32" stroke="#77DD77" stroke-width="5" stroke-linecap="round"/></svg>`;
            case "Info":
            default:
                return `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" fill="none"><style>svg{overflow:visible}#i-circle{stroke-dasharray:300;stroke-dashoffset:300;animation:draw-circle .4s ease-in-out forwards}#i-icon{transform-origin:center;transform:scale(0);animation:animate-icon .7s .1s ease-in-out forwards}@keyframes draw-circle{to{stroke-dashoffset:0}}@keyframes animate-icon{0%{transform:scale(0)}20%{transform:scale(1) rotate(-15deg)}40%{transform:scale(1.6) rotate(15deg)}60%{transform:scale(1.6) rotate(-15deg)}80%{transform:scale(1.6) rotate(15deg)}100%{transform:scale(1) rotate(0)}}</style><path id="i-circle" d="M97.5 50C97.5 76.2335 76.2335 97.5 50 97.5C23.7665 97.5 2.5 76.2335 2.5 50C2.5 23.7665 23.7665 2.5 50 2.5C76.2335 2.5 97.5 23.7665 97.5 50Z" stroke="#3D426B" stroke-width="5" stroke-linejoin="round"/><path id="i-icon" d="M57.5 76.9915V37.9661C57.5 34.0999 54.3704 30.9576 50.5 30.9576C46.6296 30.9576 43.5 34.0999 43.5 37.9661V76.9915C43.5 80.8578 46.6296 84 50.5 84C54.3704 84 57.5 80.8578 57.5 76.9915ZM43.5 22.5085C43.5 26.3747 46.6296 29.5169 50.5 29.5169C54.3704 29.5169 57.5 26.3747 57.5 22.5085C57.5 18.6422 54.3704 15.5 50.5 15.5C46.6296 15.5 43.5 18.6422 43.5 22.5085Z" fill="#3D426B" stroke="#ffffff" stroke-width="5"/></svg>`;
        }
    }

    createToastCloseIcon (toast: HTMLDivElement) : HTMLSpanElement {
        const close = document.createElement('span');
        close.innerHTML = "&#10005";
        close.classList.add('saal-toast-close');

        close.addEventListener('click', () => {
            toast.classList.remove('opening');
            toast.classList.add('removing');

            setTimeout(() => {
                toast.remove()
            }, 200);

        });

        return close;
    }

    toast(props: ToastProperties) {
        const toastBar = document.createElement('div');
        const toast = document.createElement('div');
        const textContent = document.createElement('p');
        const text = document.createTextNode(props.text);
        
        const mainContent = document.createElement('div');
        mainContent.classList.add('saal-maincontent');

        // Creating toast icon
        const icon = this.createSvgIcon(props.icon, "toast");
        icon.classList.add('saal-toast-icon');

        // Creating close icon
        const close = this.createToastCloseIcon(toast);

        textContent.appendChild(text);

        mainContent.appendChild(icon);
        mainContent.appendChild(textContent);

        toast.appendChild(mainContent)
        toast.appendChild(close);

        toast.style.minWidth = '300px';
        toast.style.height = '55px';
        toast.classList.add('saal', 'toast');
        toastBar.classList.add('saal-toastBar');

        toast.classList.add('opening');

        switch (props.icon) {
            case "Success":
                toast.classList.add('success');
                break;
            case "Warning":
                toast.classList.add('warning');
                break;
            case "Error":    
                toast.classList.add('error');
                break;
            case "Info":
            default:            
                toast.classList.add('info');
                break;
        }

        if (document.querySelector('.saal-toastBar') === null) {
            this.body.appendChild(toastBar);
            toastBar.appendChild(toast);
        } else {
            document.querySelector('.saal-toastBar')?.appendChild(toast);
        }

        if (props.timerInMiliseconds !== undefined) {
            window.setTimeout(() => {
                toast.remove();
            }, props.timerInMiliseconds);
        }
    }
}

export default SaltyAlert;