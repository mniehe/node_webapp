module.exports = {
  name: 'setup_remote_folders',
  type: 'remote',
  plan: function(transport) {
    var webRoot = transport._context.options.webRoot;

    folders = {
      root:     webRoot,
      current:  webRoot + 'current',
      shared:   webRoot + 'shared',
      node_modules: webRoot + 'shared/node_modules',
      logs: webRoot + 'shared/logs',
      pids: webRoot + 'shared/pids',
      source:   webRoot + 'source',
      newBuild: webRoot + 'source/' + new Date().getTime()
    }

    transport.log('Setup directory structure using the current webroot');
    for (var folder in folders) {
      if (folder == 'newBuild' || folder == 'current') continue;

      //transport.mkdir(folders[folder], {failsafe: true, silent: true});
    }

    // Rename the temp folder to public for server purposes
    //transport.mv('/home/deployer/tmp/.tmp /home/deployer/tmp/public', {silent: true});
    //transport.mv('/home/deployer/tmp ' + folders.newBuild, {silent: true});
  }
}