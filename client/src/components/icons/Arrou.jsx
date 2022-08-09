export const Arrou = ({active, id}) => {
    return (
        <svg className={active.includes(id)  ? 'form-search__svg-arrou-active' : 'form-search__svg-arrou'} width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path  d="M5.79171 0.810932C5.6337 0.642511 5.3663 0.642511 5.20829 0.810932L0.502881 5.82632C0.263238 6.08175 0.444349 6.5 0.794595 6.5L10.2054 6.5C10.5557 6.5 10.7368 6.08175 10.4971 5.82632L5.79171 0.810932Z"/>
        </svg>
    )
}