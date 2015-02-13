Описание функционала системы
http://esysi.com/en/instruktsii

Документация по апи
http://doc.ivantus.ru/functions_func.html

Что нам понадобится?
1. Клиентский код
2. Батник для запуска хрома
"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" "localhost" --allow-file-access-from-files --disable-web-security --enable-file-cookies

Шаги
1. Разворачиваешь у себя на веб сервере localhost, это чтобы куки отправлялись
2. В локальных скриптах \Scripts\Base\config_common.js правишь config{ domain: "account.ivantus.ru"
тогда твои локальные скрипты будут обращаться к моему серверу
3. Дальше закрыть все окна хрома и запустить батник, хром скажет что "Вы используете неподдеживаемый флаг..."
4. Дальше открываем две вкладки в хроме account.ivantus.ru и localhost
5. Там где account.ivantus.ru логинимся admin qwe ZAOATGS
6. Дальше переходим во вкладку localhost и логинимся в ней и по идее должно зайти начать работать сайт локально


Веб-сервис состоит из апи (совокупность экшнов(методов) именуемых по принципу СущностьДействие)
и RIA приложения написанного на ExtJS, протокол задокументирован обмен на json.