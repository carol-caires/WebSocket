<?php

/*
	Cliente que envia as notificações para o Socket.io através do ElephantIO
	As classes abaixo devem ser carregadas em qualquer script php que deve enviar notificações
*/

require __DIR__ . '/vendor/autoload.php';

use ElephantIO\Client,
    ElephantIO\Engine\SocketIO\Version1X;

$elephant = new Client(new Version1X('http://192.168.100.5:3000'));

$elephant->initialize();
$elephant->of('/backend'); // Namespace. Deve ser capturado no server nodejs.
$elephant->emit('notification', ['msg' => 'oie']);
$elephant->close();