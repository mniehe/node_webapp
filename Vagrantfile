# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure(2) do |config|

  config.vm.box = "ubuntu/trusty64"

  # Create a forwarded port mapping which allows access to a specific port
  # within the machine from a port on the host machine. In the example below,
  # accessing "localhost:8080" will access port 80 on the guest machine.
  config.vm.network "forwarded_port", guest: 80, host: 80 # Production server
  config.vm.network "forwarded_port", guest: 35729, host: 35729 # Live reload
  config.vm.network "forwarded_port", guest: 8080, host: 8080 # Development server
  
  # config.ssh.username = "deployer"

  config.vm.provider "virtualbox" do |vb|
    # Display the VirtualBox GUI when booting the machine
    vb.gui = false
    # Customize the amount of memory on the VM:
    vb.memory = "1024"
    vb.name = "Node Webapp Starter"
    vb.cpus = 1
  end

  config.vm.provision "shell", path: "config/provision.sh"
end
