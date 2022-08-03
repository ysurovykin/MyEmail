
import './themeCircle.css'

function ThemeCircle({ theme, choosenColorTheme, setColorTheme }) {

    const onChooseTheme = (theme) => {
        switch (theme.target.id) {
            case 'winter-theme': setColorTheme('winter');
                break;
            case 'summer-theme': setColorTheme('summer');
                break;
            case 'autumn-theme': setColorTheme('autumn');
                break;
            case 'spring-theme': setColorTheme('spring');
                break;
        }
    };
    return (
        <span className="theme-circle" id={theme + '-theme'} onClick={onChooseTheme} style={choosenColorTheme === theme ? { border: '2px solid black' } : null}></span>
    )
}

export default ThemeCircle;